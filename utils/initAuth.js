import { init } from 'next-firebase-auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBHUACDyden56YRTm1QVQWiPdYEwaC0-U8",
  authDomain: "dtasks-bgn21.firebaseapp.com",
  databaseURL: "https://dtasks-bgn21-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dtasks-bgn21",
  storageBucket: "dtasks-bgn21.appspot.com",
  messagingSenderId: "865012238343",
  appId: "1:865012238343:web:e218946813a49ff5d082a2"
};

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/app',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'dtasks-bgn21',
        clientEmail: 'firebase-adminsdk-ohbm9@dtasks-bgn21.iam.gserviceaccount.com',
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      },
      databaseURL: firebaseConfig.databaseURL,
    },
    firebaseClientInitConfig: firebaseConfig,
    cookies: {
      name: 'dtasksbgn21', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  })
}

export default initAuth