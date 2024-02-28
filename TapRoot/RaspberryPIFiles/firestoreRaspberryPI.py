import firebase_admin
from firebase_admin import db, credentials
from google.cloud import firestore
import time
import board
from adafruit_seesaw.seesaw import Seesaw
import datetime

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://taproot-561bd-default-rtdb.firebaseio.com"})
firestoreDB = firestore.Client()
doc_ref = firestoreDB.collection('tData').document('tEntryData')
i2c_bus = board.I2C()  # uses board.SCL and board.SDA
ss = Seesaw(i2c_bus, addr=0x36)

# Function to update or append new data
def update_or_append_data(current_date, touch, current_time):
    try:
        # Attempt to get today's data document
        today_doc = doc_ref.get()
        if today_doc.exists:
            today_data = today_doc.to_dict()
            # Check if there's an entry for today, if not, initialize
            if 'Data' not in today_data or today_data['Data'][-1]['date'] != current_date:
                today_data['Data'].append({'date': current_date, 'readings': []})
            # Append new reading
            today_data['Data'][-1]['readings'].append({'humidity': touch, 'time': current_time})
        else:
            # No document found, initialize structure
            today_data = {
                'Data': [
                    {'date': current_date, 'readings': [{'humidity': touch, 'time': current_time}]}
                ]
            }
        # Update document
        doc_ref.set(today_data)
    except Exception as e:
        print(f"Failed to update or append data: {e}")

# Main loop
while True:
    touch = ss.moisture_read()
    temp = ss.get_temp()

    current_datetime = datetime.datetime.now()
    current_date = current_datetime.date().isoformat()
    current_time = current_datetime.time().strftime('%H:%M:%S')

    # Update Realtime Database (optional)
    db.reference("/testSensor/humidityLevel").set(touch)

    # Update Firestore with the new reading
    update_or_append_data(current_date, touch, current_time)

    # Sleep for a specified time
    time.sleep(14400)

