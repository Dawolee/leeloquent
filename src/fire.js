import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCOOqhJdIyjU35Fhtlq3ozWvz4xIqYr4-4',
  authDomain: 'leeloquent.firebaseapp.com',
  databaseURL: 'https://leeloquent.firebaseio.com',
  projectId: 'leeloquent',
  storageBucket: 'leeloquent.appspot.com',
  messagingSenderId: '701898771477'
}

let fire = firebase.initializeApp(config)

const settings = { timestampsInSnapshots: true }

export const db = firebase.firestore()

db.settings(settings)

export default fire
