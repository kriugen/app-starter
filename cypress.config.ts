import { defineConfig } from "cypress";
const encrypt = require('cypress-nextjs-auth0/encrypt');

export default defineConfig({
  env: {
    auth0Audience: "https://supercards.auth0.com/api/v2/",
    auth0Domain: "supercards.auth0.com",
    auth0ClientId: "sLF6P0hH94ScpkMR458FR2B3YEP79bLB",
    auth0ClientSecret: "uG_Hhsi8u09nkvAg5sslDEGyD3kdrszbBvPl8ljzP0vHjGDwJcH5N_TCvILfiiVP",
    auth0CookieSecret: "889b1ddbbfa647f4f555a9e2bc12384771997237223d2aa092b7cc4645ef94ed",
    auth0Scope: "openid profile email",
    auth0SessionCookieName: "appSession",
    auth0LogoutUrl: "/api/auth/logout",
    auth0ReturnToUrl: "/",
    auth0Username: "borisbars1978@gmail.com",
    auth0Password: "123",
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
        on('task', { encrypt });
    },
  },
});
