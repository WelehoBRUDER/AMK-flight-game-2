import os
import geopy.distance as distance
import mysql.connector
import random
from dotenv import load_dotenv
from geographiclib.geodesic import Geodesic

db = {}
# If enabled, prints debug lines when database is altered.
debug_mode = False


def connect_to_db():
    # Loads .env to current os.environ
    load_dotenv()

    # Load database credentials from .env
    # This is to prevent having to commit sensitive information
    # like password and username
    db_variables = {
        'host': os.getenv('HOST'),
        'user': os.getenv('USER'),
        'password': os.getenv('PASSWORD'),
        'database': os.getenv('DATABASE')
    }

    # Connect to SQL-database using the .env variables
    db["database"] = mysql.connector.connect(**db_variables)
    db["cursor"] = db["database"].cursor(dictionary=True)


# This function returns 16 random airports, 2 in each direction
# The origin point is the latitude and longitude of the current airport
# The return value is a list of dictionaries with the keys "flight_direction", "distance" and "airport"
# Distance is returned in kilometers.
# [{"flight_direction: "North-West", "distance": 129, "airport": {...}}, ...]
def draw_airports_from_origin(lat, lon, port_type):
    # North, North-East, East, South-East, South, South-West, West, North-West
    flight_bearings = (0, 45, 90, 135, 180, 225, 270, 315)
    bearings_text = ("North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West")
    flights = []
    # Minimum and maximum distance from current airport in miles
    min_max_dists = {"small_airport": (1000, 1500), "medium_airport": (1000, 2250), "large_airport": (1700, 3000)}
    min_dist, max_dist = min_max_dists[port_type]
    for i in range(len(flight_bearings)):
        bearing = flight_bearings[i]
        # Randomly pick distance to travel to
        flight_distance = random.randint(min_dist, max_dist)
        # Get latitude and longitude of randomly selected place using the origin point
        destination = distance.distance(miles=flight_distance).destination((lat, lon), bearing=bearing)
        # Gets the latitude and longitude of the desired point
        point_lat, point_lon = destination.latitude, destination.longitude
        # Request two airports that are as close as possible to the point
        # This is done by adding the latitude and longitude together and sorting the absolute value
        db["cursor"].execute(
            f"""SELECT * FROM airport
             ORDER BY ABS({point_lat} - latitude_deg) + ABS({point_lon} - longitude_deg) ASC
              LIMIT 2;""")
        # This could also be fetchall() since the query is limited to 2
        # But things might break if somehow more were to slip past
        airport_data = db["cursor"].fetchmany(2)
        # If airports were found, add them to the list that will be returned
        if airport_data:
            for airport in airport_data:
                # Calculate the distance between origin and flight point
                point_a, point_b = [lat, lon], [airport["latitude_deg"], airport["longitude_deg"]]
                dist_to_port = int(distance_between_two_points(point_a, point_b))
                flights.append({"flight_direction": bearings_text[i], "distance": dist_to_port, "airport": airport})

    return flights


# Just gets a random airport with no criteria.
# This is used for picking the starting airport.
def get_random_airport():
    db["cursor"].execute("SELECT * FROM airport ORDER BY RAND() LIMIT 1;")
    airport_data = db["cursor"].fetchone()
    if airport_data:
        return airport_data


# This function calculates the distance between two geographical points
# It takes the latitude and longitude of both places as tuples or lists
# Example: distance_between_two_points((25, 67), (34, 100))
def distance_between_two_points(point_a, point_b):
    flight_distance = distance.distance(point_a, point_b).km
    return flight_distance


# Returns azimuth2 bearing between two geographical points.
# It takes the latitude and longitude of both places as tuples or lists
# Example: bearing_between_two_points((25, 67), (34, 100))
def bearing_between_two_points(point_a, point_b):
    lat1, lon1 = point_a
    lat2, lon2 = point_b
    bearing = Geodesic.WGS84.Inverse(lat1, lon1, lat2, lon2)
    return bearing["azi1"]


# This function returns data about the requested airport from the db
# It requires the airports ident code as a parameter
# Example: get_airport("EFHK")
def get_airport(code):
    if code:
        db["cursor"].execute(f"SELECT * FROM airport WHERE ident = '{code}';")
        airport = db["cursor"].fetchone()
        if airport:
            return airport
        return print(f"Airport {code} doesn't exist.")
    return print("Airport code can't be empty!")


def get_airport_by_cords(lat, lon):
    if lat and lon:
        db["cursor"].execute(f"SELECT * FROM airport WHERE latitude_deg = {lat} AND longitude_deg = {lon};")
        airport = db["cursor"].fetchone()
        if airport:
            return airport


# This function returns data about all requested airports at once
# Example: get_multiple_airports(["EFHK", "EFET"])
def get_multiple_airports(codes):
    query = ""
    for i in range(len(codes)):
        code = codes[i]
        query += f"ident = '{code}'{' OR ' if i < len(codes) - 1 else ''}"
    db["cursor"].execute(f"""
    SELECT * FROM AIRPORT
    WHERE {query};
    """)
    airports = db["cursor"].fetchall()
    return airports


# This function returns the data of all airports in the db (thousands of entries)
def get_all_airports():
    db["cursor"].execute(f"SELECT * FROM AIRPORT")
    airports = db["cursor"].fetchall()
    return airports


# This function returns data about the requested country from the db
# It requires the country's ISO-code as a parameter
# Example: get_country("FI")
def get_country(iso_country):
    if iso_country:
        db["cursor"].execute(f"SELECT * FROM country WHERE iso_country = '{iso_country}';")
        country = db["cursor"].fetchone()
        if country:
            return country
        return print(f"ISO-code {iso_country} doesn't exist.")
    return print("No ISO-code in parameters!")


# Generates a random string of numbers with a length of 17 characters.
def generate_random_id():
    _id = ""
    for i in range(17):
        _id += str(random.randint(0, 9))
    return _id


# This function adds a new player to the database.
# The database holds all winners for the leaderboards screen.
def add_player_to_db(player):
    # ID must be generated so that the chance of duplicates is effectively 0%
    player_id = generate_random_id()
    db["cursor"].execute(f"""
    INSERT INTO game (id, screen_name, co2_consumed, money, time, real_time, distance_traveled, score)
    VALUES ('{player_id}', '{player.screen_name}', {player.co2_consumed}, {player.money}, {player.time}, {player.real_time}, {player.distance_traveled}, {player.score()});
    """)
    db["database"].commit()
    if debug_mode:
        print(f"Added {player.screen_name} to game table.")


# This function gets all players from the database
# sorted by their score.
def get_all_players_from_db():
    db["cursor"].execute(f"""
    SELECT * FROM game
    ORDER BY score DESC;
    """)
    player = db["cursor"].fetchall()
    if debug_mode:
        print(f"Returned all players from db.")

    return player


# This function removes all airports that are not small, medium or large.
# Ideally this should run only once, though subsequent queries don't affect anything.
def delete_unnecessary_airports():
    # First trim to the airport types we like
    db["cursor"].execute("""
    DELETE FROM airport
    WHERE NOT type = "small_airport" AND NOT type = "medium_airport" AND NOT type = "large_airport";
    ;""")
    db["database"].commit()
    # Then remove ports without a municipality
    db["cursor"].execute("""
    DELETE FROM airport
    WHERE municipality = "";
    ;""")
    db["database"].commit()
    # Finally remove ports that don't have service
    db["cursor"].execute("""
    DELETE FROM airport
    WHERE scheduled_service = "no"
    ;""")
    db["database"].commit()
    if debug_mode:
        print("Deleted unnecessary airports (heli, balloon, closed and seaplane).")


# This function adds all needed columns and removes unneeded columns in game table.
# Ideally this should run only once.
def modify_game_table():
    to_add = (("money", "int"), ("time", "int"), ("real_time", "int"), ("score", "int"), ("distance_traveled", "int"))
    to_remove = ("co2_left", "co2_budget")
    for pair in to_add:
        try:
            key = pair[0]
            key_type = pair[1]
            print(f"ALTER TABLE game ADD {key} {key_type};")
            db["cursor"].execute(f"ALTER TABLE game ADD {key} {key_type};")
            db["database"].commit()
            if debug_mode:
                print(f"Added column '{key}' as {key_type} to game table.")
        except Exception as e:
            if debug_mode:
                print(e)
    for key in to_remove:
        try:
            db["cursor"].execute(f"ALTER TABLE game DROP COLUMN {key};")
            db["database"].commit()
            if debug_mode:
                print(f"Deleted column '{key}' from game table")
        except Exception as e:
            if debug_mode:
                print(e)


# This function runs all other functions that change contents / columns of the database.
# It needs to be run once before playing the game.
def init_tables():
    delete_unnecessary_airports()
    modify_game_table()


"""
    This function checks if the player has traveled around the entire world.
    It will check when the player flies over the halfway point, and when they finish their journey.
"""


def track_progress(origin_latitude, origin_longitude, halfway_latitude, halfway_longitude, location, last_location,
                   **kwargs):
    # This local function is used when the player overshoots their flight.
    # If the player for example flies >500km over the check point, then this would happen:
    # The flight between the player's last airport and current point is broken into twenty steps.
    # Each step is 5% of the distance and will be checked in order.
    # Once the step that crosses the distance is found, it is set as the player's halfway point.
    # From then on, the halfway point will be treated as the origin.
    def check_steps(start_lat, start_lon, finish=False):
        # Break the flight up to ten steps.
        for i in range(1, 21):
            # Gets the current step's point in the flight path.
            # (i / 10) will yield a multiplier that starts at 0.05 (5%) and increments by 5% each step.
            # 1.609344 = 1 mile to km.
            # This part essentially goes through the current flight at 5% intervals.
            point_in_flight = distance.distance(
                miles=(cur_last_dist * (i / 20)) / 1.609344).destination(
                (last_lat, last_lon), bearing=angle)
            point_lat, point_lon = point_in_flight.latitude, point_in_flight.longitude
            # Check the distance between current flight point and the origin / halfway point.
            # If not, then continue the loop until we reach 100%
            if distance_between_two_points((start_lat, start_lon),
                                           (point_lat, point_lon)) >= halfway_distance:
                # If the player hasn't yet reached the halfway point, then it will be set.
                if not finish:
                    return {"halfway": True, "point": (point_lat, point_lon)}
                # If the player has reached the halfway point before, they win!
                else:
                    return {"finished": True, "point": (point_lat, point_lon)}

        return {"halfway": False, "finished": False}

    # Half of the earth's circumference would be ~20000km
    # But reaching that is nearly impossible, so we're checking for something far less than that.
    halfway_distance = 15000
    # Get current and last airport
    current_location = get_airport(location)
    last_location = get_airport(last_location)
    # Get coordinates of current and last airport
    current_lat, current_lon = current_location["latitude_deg"], current_location["longitude_deg"]
    last_lat, last_lon = last_location["latitude_deg"], last_location["longitude_deg"]
    # Get distance between current and last airport.
    cur_last_dist = distance_between_two_points((last_lat, last_lon), (current_lat, current_lon))
    # Calculate the flight angle between current and last airport.
    angle = bearing_between_two_points((last_lat, last_lon), (current_lat, current_lon))

    # If the player hasn't yet reached the halfway point, then use origin.
    if not halfway_latitude or not halfway_longitude:

        # Calculate distance between origin and player's location
        distance_between = distance_between_two_points((origin_latitude, origin_longitude), (current_lat, current_lon))
        # If the player has passed the halfway point, inform them
        if distance_between >= halfway_distance:
            return {"halfway": True, "point": (current_lat, current_lon)}
        # If the player overshot, then find the passing point with a more thorough check.
        if (distance_between + cur_last_dist) >= halfway_distance:
            check_steps(origin_latitude, origin_longitude)
        # You didn't get far enough yet!
        else:
            return {"halfway": False}

    # Otherwise, use the halfway point as origin.
    else:

        # Calculate distance between halfway and player's location
        distance_between = distance_between_two_points((halfway_latitude, halfway_longitude),
                                                       (current_lat, current_lon))
        # If the player has returned to their origin, they win!
        if distance_between >= halfway_distance:
            return {"finished": True}
        # If the player overshot their origin, check more thoroughly.
        if (distance_between + cur_last_dist) >= halfway_distance:
            check_steps(halfway_latitude, halfway_longitude)
        # You didn't get far enough yet (twice)!
        else:
            return {"finished": False}
    return {}


connect_to_db()
# print(distance_between_airports("EFHK", "EFIV"))
# print(get_some_airports())
# port = get_airport(code="EFHK")
# _flights = draw_airports_from_origin(port["latitude_deg"], port["longitude_deg"])
# for flight in _flights:
#     print(flight["distance"], flight["airport"]["iso_country"], flight["airport"]["type"])
# print(get_country("FI"))

# init_tables()
