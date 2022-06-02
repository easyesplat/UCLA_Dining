#!/usr/bin/python3

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# initializing firebase
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
  'projectId': "ucla-dining",
})
db = firestore.client()

# creating collection for front-end
db.collection('Ratings').document('Test Person').set({'Test': 'Test'})
db.collection('users').document('Test Person').set({'Test': 'Test'})

