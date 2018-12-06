# -*-encoding:utf8-*-
# -*- coding: utf-8 -*-
from flask import Flask, render_template
# from pymongo import MongoClient
from flask import jsonify
from pymongo import MongoClient
import json
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/assessment')
def assessment():
    return render_template("assessment.html")

@app.route('/invest')
def invest():
    return render_template("invest.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/history')
def history():
    return render_template("history.html")
# @app.route('/<email>')
# def logined_main_page(email):
#     return render_template("index.html",email=email)

@app.route('/get_user/<email>')
def get_user(email):
    uri = "mongodb://LICHING:justtheway402@ds225624.mlab.com:25624/gp_invest"
    client = MongoClient(uri)
    db = client['gp_invest']
    collect = db['user_info']
    registered = collect.find_one({'email':email})
    if (registered == None) :
        collect.insert_one({'email':email})
        return 'inserted'
    else:
        return 'existed'

if __name__ == "__main__":
    app.run(debug=True)