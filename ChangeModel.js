import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


console.log("In Change Model")
const div = document.getElementById("test-div");
const firebaseConfig = {
  apiKey: "AIzaSyD4z6orD880wzC453IwB7IJMHbDgGnOEak",
  authDomain: "food2view-storage.firebaseapp.com",
  databaseURL: "https://food2view-storage-default-rtdb.firebaseio.com",
  projectId: "food2view-storage",
  storageBucket: "food2view-storage.appspot.com",
  messagingSenderId: "854509118316",
  appId: "1:854509118316:web:2865aafdc9d2238a0b4949",
};
const db = getDatabase();
const reference = ref(db, "selected/");
set(reference, {
  Selected: div.dataset.test
});

window.location.reload();


