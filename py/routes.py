from flask import Flask, jsonify, request
from db import get_all_players_from_db, get_all_airports, get_country

app = Flask(__name__)


# Gets all airports in the current db
@app.route("/get-all-airports", methods=["GET"])
def all_airports():
    airports = get_all_airports()
    return jsonify(airports)


# Gets all players in the current db
@app.route("/get-all-players", methods=["GET"])
def all_players():
    players = get_all_players_from_db()
    return jsonify(players)


# Gets information about a specific country
@app.route("/get-country/<code>", methods=["GET"])
def get_country(code: str):
    country = get_country(code)
    return jsonify(country)


# Run server
app.run(host="127.0.0.1", port=5000)