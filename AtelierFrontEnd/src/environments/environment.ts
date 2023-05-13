// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import axios from "axios";

export const environment = {
  production: false,
	SOCKET_ENDPOINT: 'http://localhost:5000',
  baseUrl: 'http://localhost:4200',
  endpointUrl: 'http://localhost:3000',
  firebaseConfig : {
    apiKey: "AIzaSyA0ET7oXkSP22IN-VulRuB3VXja9d0zCXI",
    authDomain: "arachnoid-a42069.firebaseapp.com",
    projectId: "arachnoid-a42069",
    storageBucket: "arachnoid-a42069.appspot.com",
    messagingSenderId: "447159358959",
    appId: "1:447159358959:web:5be4127908d13edb01521a",
    measurementId: "G-DT5FZXC14N"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
