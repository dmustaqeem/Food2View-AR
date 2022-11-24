import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const starCountRef = ref(db, "selected");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  div.dataset.test = data.Selected;
  if (div.dataset.test != null) {
    var script = document.createElement("script"); //creating <script> element
    script.src = "./ARScene.js";
    script.async = true;
    document.body.appendChild(script);
  }
});

// const reference = ref(db, "selected/");
// set(reference, {
//   Selected: "",
// });
