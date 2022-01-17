// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://localhost:8082/api/',
  browserURL:"http://localhost:4200/",
  firebase: {
    apiKey: "AIzaSyDOogMcY1r1kWW8e7zoxNUQ6GVFgTCopFk",
    authDomain: "lab5-73cf8.firebaseapp.com",
    databaseURL: "https://lab5-73cf8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lab5-73cf8",
    storageBucket: "lab5-73cf8.appspot.com",
    messagingSenderId: "498604697221",
    appId: "1:498604697221:web:77808577e79dad41056bec",
    measurementId: "G-X4YD6989P1"
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
