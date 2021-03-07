import firebase from "firebase/app";
import "firebase/database";
import "../styles/globals.css";
import initAuth, { firebaseConfig } from "../utils/initAuth";

initAuth();

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
