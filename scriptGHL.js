alert("Penetrato Veramente sta volta");

console.log("INIZIO PROGRAMMA");

//Functions
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlrdtKeLO7ElgKO2Nxk5jF5h95Rq4PpdE",
  authDomain: "incarichi-online-36049.firebaseapp.com",
  projectId: "incarichi-online-36049",
  storageBucket: "incarichi-online-36049.appspot.com",
  messagingSenderId: "189062115820",
  appId: "1:189062115820:web:ff24c779a7c030a43bd0c9",
  measurementId: "G-59P7283L90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

var punti = 0;
var nome = " --errore recupero del nome--";
var email = " --errore recupero del email--";
var waiterPath =
  "#app > div.flex.v2-open.sidebar-v2-location.Z1XWahFSwgT8MCKhOIhs.flex.v2-open.sidebar-v2-location > div:nth-child(2) > header > div.container-fluid > div:nth-child(3) > div:nth-child(3) > a > div > div";
console.log("prima della funzione");

//Funzione
waitForElm(waiterPath).then(async (elm) => {
  console.log("Penetrato");
  alert("Penetrato");

  var nomePath =
    "//*[@id='app']/div[3]/div[2]/header/div[1]/div[3]/div[2]/div/div/div/div[2]/div[1]";
  var emailPath =
    "//*[@id='app']/div[3]/div[2]/header/div/div[3]/div[2]/div/div/div/div[2]/div[2]";

  nome = document.evaluate(
    nomePath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue.innerHTML;

  email = document.evaluate(
    emailPath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue.innerHTML;

  console.log("Nome: " + nome);
  console.log("Email: " + email);

  if (email == "kayodionizio@gmail.com") {
    //Fetching
    var queryToFetch = query(
      collection(db, "Clienti"),
      where("Email", "==", "rubecadevis@gmail.com")
    );

    const newData = await getDocs(queryToFetch)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        // if other error
      })
      .catch(function (error) {
        console.log("Error: Getting document:", error);
        // WHAT DO I NEED TO RETURN HERE???
      });

    punti = newData[0].Punti;
    var data = newData[0].Data.seconds;
    var ClientDate = new Date(data * 1000);
    var Today = new Date(Date.now());
    var point = monthDiff(ClientDate, Today) * 100;

    punti = punti + point;

    let html =
      "<div style='width: auto; height: 50px; background-color: white;display: flex;justify-content: center; align-items: center;font-size: 20px;color: black;'>Buongiorno " +
      nome +
      " attualmente hai " +
      punti.toString() +
      " punti</div>";
    //*[@id="app"]/div[3]/div[2]/header/div/div[3]

    document
      .evaluate(
        "//*[@id='app']/div[3]/div[2]/header/div[1]/div[3]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      )
      .singleNodeValue.insertAdjacentHTML("beforeBegin", html);
  }
});
