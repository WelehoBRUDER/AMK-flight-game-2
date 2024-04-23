from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_all_players_from_db, get_all_airports, get_country, generate_random_id

app = Flask(__name__)
CORS(app)  # This configures the CORS requests automatically so that we don't need to rip all our hair out.


# Gets all airports in the current db
@app.route("/get-all-airports", methods=["GET"])
def all_airports():
    response = jsonify(get_all_airports())
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


# Run server
app.run(host="127.0.0.1", port=5000)