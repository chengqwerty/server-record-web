// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api: {
        baseUrl: 'http://localhost:4201/',
        refreshTokenEnabled: false,
        refreshTokenType: 're-request',
        loginUrl: '',
        refreshUrl: ''
    }
};

export const HttpCollections = {
    // 系统请求
    sysUrl: 'http://localhost:30080'
    // sysUrl: 'http://172.16.0.208:7051/serd'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
