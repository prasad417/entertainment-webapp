const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:8080/login/callback',
    scopes: ['openid', 'profile'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    imageUrl: 'https://prasaddy.x10host.com/Images/',
    languagesUrl: 'https://entertainment-restapi.herokuapp.com/api/languages',
    moviesUrl: 'https://entertainment-restapi.herokuapp.com/api/movies'
  }
};
