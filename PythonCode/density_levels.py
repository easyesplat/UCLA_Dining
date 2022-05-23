from firebase import firebase

#not too busy, getting busy, very busy, do not come here, covid farm

firebase = firebase.FirebaseApplication('https://ucla-dining-default-rtdb.firebaseio.com', None)
data =  { 'level': 'Not too busy'
        }
# result = '/density/Epicuria/' + list(firebase.get('/density/Epicuria', None).keys())[0]
# print(result)
# firebase.delete(result, None)


firebase.post('/density/Epicuria/',data)
firebase.post('/density/Bruin Plate/',data)

