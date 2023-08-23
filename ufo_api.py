import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, extract, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup - please refer to readme file for the steps to create DB and load Data.
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/ufo_db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# # Save reference to the table
ufo_data = Base.classes.ufo_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/mahsa")
def mahsa():
    return render_template('index_Mahsa.html')

@app.route("/kalyn")
def welcome():
    return render_template('index.html')

@app.route("/")
def ana():
    return render_template('index_ana.html')

@app.route("/api/ufo_data")
def ufoData():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers

    return { id:country for id, country in  session.query(ufo_data.id, ufo_data.country).all()}

@app.route("/api/states")
def ufoCities():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers

    return { str(date)[:10]:state for date, state in  session.query(ufo_data.timestamp, ufo_data.state).filter(ufo_data.country=='us').all()}

@app.route("/api/hourlyObservations")
def hourlyObservations():
    session = Session(engine)
    day_night_observations = session.query(extract('hour', ufo_data.timestamp), func.count(
        extract('hour', ufo_data.timestamp))).group_by(extract('hour', ufo_data.timestamp)).order_by(extract('hour', ufo_data.timestamp)).all()
    
    hourlyObservations = {str(hour):obss for hour, obss in day_night_observations}
    
    return jsonify(hourlyObservations)

@app.route("/api/monthlyObservations")
def monthlyObservations():
    session = Session(engine)
    monthly_observations = session.query(extract('month', ufo_data.timestamp), func.count(
        extract('month', ufo_data.timestamp))).group_by(extract('month', ufo_data.timestamp)).order_by(extract('month', ufo_data.timestamp)).all()
    
    monthlyObservations = {str(month):obss for month, obss in monthly_observations}
    
    return jsonify(monthlyObservations)

@app.route("/api/yearlyObservations")
def yearlyObservations():
    session = Session(engine)
    yearly_observations = session.query(extract('year', ufo_data.timestamp), func.count(
        extract('year', ufo_data.timestamp))).group_by(extract('year', ufo_data.timestamp)).order_by(extract('year', ufo_data.timestamp)).all()
    
    yearlyObservations = {str(year):obss for year, obss in yearly_observations}
    
    return jsonify(yearlyObservations)

if __name__ == '__main__':
    app.run(debug=True)
