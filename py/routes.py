from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_all_players_from_db, get_all_airports, get_country, generate_random_id, get_all_non_small_airports, draw_airports_from_origin, get_airport, bearing_between_two_points

app = Flask(__name__)
CORS(app)  # This configures the CORS requests automatically so that we don't need to rip all our hair out.


# Gets all airports in the current db
@app.route("/get-all-airports", methods=["GET"])
def all_airports():
    response = jsonify(get_all_airports())
    return response

@app.route("/get-non-small-airports", methods=["GET"])
def non_small_airports():
    response = jsonify(get_all_non_small_airports())
    return response

@app.route("/get-airports-around/", methods=["GET"])
def airports_around():
    print(request.args)
    ident = request.args.get("ident")
    type = request.args.get("type")
    airport = get_airport(ident)
    print(airport["latitude_deg"])
    response = jsonify(draw_airports_from_origin(airport["latitude_deg"], airport["longitude_deg"], type))
    return response


# Gets all players in the current db
@app.route("/get-all-players", methods=["GET"])
def all_players():
    response = jsonify(get_all_players_from_db())
    return response


# Gets information about a specific country
@app.route("/get-country/<code>", methods=["GET"])
def get_country_with_code(code: str):
    response = jsonify(get_country(code))
    return response

@app.route("/create-id", methods=["GET"])
def create_id():
    response = jsonify(generate_random_id())
    return response

@app.route("/bearing/", methods=["GET"])
def get_bearing():
    lat1 = float(request.args.get("lat1"))
    lon1 = float(request.args.get("lon1"))
    lat2 = float(request.args.get("lat2"))
    lon2 = float(request.args.get("lon2"))
    angle = jsonify(bearing_between_two_points((lat1, lon1), (lat2, lon2)))
    return angle
    


# Run server
app.run(host="127.0.0.1", port=5000)