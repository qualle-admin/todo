import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD8KUOhTNcld6ibK2d4S4g98ygKkz4_Tog',
  authDomain: 'todo-8e927.firebaseapp.com',
  projectId: 'todo-8e927',
  storageBucket: 'todo-8e927.appspot.com',
  messagingSenderId: '544306206247',
  appId: '1:544306206247:web:6d5947c74c01337169a002'
});

const api = firebaseApp.firestore();

export default api;