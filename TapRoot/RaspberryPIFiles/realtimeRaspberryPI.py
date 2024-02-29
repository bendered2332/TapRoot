import firebase_admin
from firebase_admin import db, credentials
import time
import board
from adafruit_seesaw.seesaw import Seesaw
from  datetime import datetime
import json

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://taproot-561bd-default-rtdb.firebaseio.com"})

i2c_bus = board.I2C()


while True:
    var = db.reference("/testSensor/isRefreshPressed").get()

    ss = Seesaw(i2c_bus, addr=0x36)

    touch = ss.moisture_read()
    if var == "true":
       db.reference("/testSensor/humidityLevel").set(touch)
       db.reference("/testSensor/isRefreshPressed").set("false")
