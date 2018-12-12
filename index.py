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
    uri = "mongodb://LICHING:justtheway402@ds225624.mlab.com:25624/gp_invest"
    client = MongoClient(uri)
    db = client['gp_invest']
    collect = db['user_info']
    investedProfolio = collect.find_one({'user':'Admin'})
    history = investedProfolio['history']
    return render_template("history.html",history=history)

@app.route('/directInvest')
def directInvest():
    return render_template("directInvest.html")
# @app.route('/<email>')
# def logined_main_page(email):
#     return render_template("index.html",email=email)

@app.route('/getmethod/<jsdata>')
def get_javascript_data(jsdata):
    needInsert = 0
    uri = "mongodb://LICHING:justtheway402@ds225624.mlab.com:25624/gp_invest"
    client = MongoClient(uri)
    db = client['gp_invest']
    collect = db['user_info']
    userInfo = collect.find_one({'user':'Admin'})
    try:
        originArr = userInfo['history']
        for i in range(0,len(originArr)):
            if(originArr[i] == jsdata):
                needInsert = 1
        if(needInsert == 0):
            originArr.append(jsdata)
            collect.update_one({
                'user':'Admin'
            },{
                '$set':{
                    'history':originArr
                }
            },upsert=False)
    except:
        originArr = []
        originArr.append(jsdata)
        collect.update_one({
            'user':'Admin'
        },{
            '$set':{
                'history':originArr
            }
        },upsert=False)
    
    return jsdata


if __name__ == "__main__":
    app.run(debug=True)