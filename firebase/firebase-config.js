
import app from 'firebase/app';
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDVWf_Qq0uORtQcgcZt6GwUFQ3hR_eIiws",
    authDomain: "restaurant-1c160.firebaseapp.com",
    projectId: "restaurant-1c160",
    storageBucket: "restaurant-1c160.appspot.com",
    messagingSenderId: "569740470350",
    appId: "1:569740470350:web:8890719e15d4e6b046fb1f",
    measurementId: "G-MZ4D5FMNTP"
};
 

 
class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
            app.firestore().settings({ experimentalForceLongPolling: true });
        }
        this.db = app.firestore();
    }
}
 

 
const  firebase =new Firebase();



export default firebase;
