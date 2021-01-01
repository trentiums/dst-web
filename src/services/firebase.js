import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
const app = firebase.initializeApp({
  apiKey: 'AIzaSyDsXf4hZojpKeB1It5qxvYtlbnYqE22rI0',
  authDomain: 'ulassa-dst.firebaseapp.com',
  databaseURL: 'https://ulassa-dst.firebaseio.com',
  projectId: 'ulassa-dst',
  storageBucket: 'ulassa-dst.appspot.com',
  messagingSenderId: '454646158625',
  appId: '1:454646158625:web:1179ce2ffcfdf92a255a60',
  measurementId: 'G-QLHXRZWGD8',
})
export default app
export const auth = app.auth()
export const analytics = app.analytics()
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider)
const facebookProvider = new firebase.auth.FacebookAuthProvider()
export const doSignInWithFacebook = () => auth.signInWithPopup(facebookProvider)
