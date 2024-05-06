import os
import geopy.distance as distance
import mysql.connector
import random
from dotenv import load_dotenv
from geographiclib.geodesic import Geodesic

db = {}
# If enabled, prints debug lines when database is altered.
debug_mode = False


all_airports = []

class Airport:
  def __init__(self, port):
    self.id = port["id"]
    self.ident = port["ident"]
    self.type = port["type"]
    self.name = port["name"]
    self.latitude_deg = port["latitude_deg"]
    self.longitude_deg = port["longitude_deg"]
    self.elevation_ft = port["elevation_ft"]
    self.continent = port["continent"]
    self.iso_country = port["iso_country"]
    self.municipality = port["municipality"]
    self.gps_code = port["gps_code"]
    self.wikipedia_link = port["wikipedia_link"]
    
    
def load_ports():
    ports = get_all_airports()
    for port in ports:
        all_airports.append(port)
    




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



# Just gets a random airport with no criteria.
# This is used for picking the starting airport.
def get_random_airport():
    index = random.randint(0, len(all_airports) - 1)
    return all_airports[index]

def get_airports_sorted_by_distance(lat, lon, amnt):
    items = []
    for i in range(amnt + 1):
        item = all_airports[i]
        item["distance"] = distance_between_two_points([item["latitude_deg"], item["longitude_deg"]],  [lat, lon])
        items.append(all_airports[i])
    return items
    


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

def get_random_airports(amnt):
    if amnt:
        continents = []
        ports = []
        for _ in range(0, amnt):
            port = all_airports[random.randint(0, len(all_airports) - 1)]
            while(port["continent"] in continents):
                port = all_airports[random.randint(0, len(all_airports) - 1)]
            ports.append(port)
            continents.append(port["continent"])
    
    return ports

# This function returns data about the requested airport from the db
# It requires the airports ident code as a parameter
# Example: get_airport("EFHK")
def get_airport(code):
    if code:
        port = {}
        for airport in all_airports:
          if airport["ident"] == code:
              port = airport
        if port:
            return port
        return print(f"Airport {code} doesn't exist.")
        
    return print("Airport code can't be empty!")


def get_airport_by_cords(lat, lon):
    if lat and lon:
        port = {}
        for airport in all_airports:
          if airport["latitude_deg"] == lat and airport["longitude_deg"] == lon:
              port = airport
        if port:
            return port


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

def get_all_non_small_airports():
    db["cursor"].execute(f"SELECT * FROM AIRPORT WHERE NOT type='small_airport' LIMIT 250;")
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
    WHERE NOT type = "large_airport";
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


connect_to_db()
load_ports()
# print(distance_between_airports("EFHK", "EFIV"))
# print(get_some_airports())
# port = get_airport(code="EFHK")
# _flights = draw_airports_from_origin(port["latitude_deg"], port["longitude_deg"])
# for flight in _flights:
#     print(flight["distance"], flight["airport"]["iso_country"], flight["airport"]["type"])
# print(get_country("FI"))

# init_tables()
