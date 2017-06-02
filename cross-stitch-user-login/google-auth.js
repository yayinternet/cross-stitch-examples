const GoogleAuth = require('google-auth-library');

const CLIENT_ID =
	'779951118654-9fc4i79pl2qqqet6cs25tbq2ng1dkrip.apps.googleusercontent.com';

function validateToken(token) {
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(CLIENT_ID, '', '');

  return new Promise((resolve) => {
    client.verifyIdToken(
      token,
      CLIENT_ID,
      function(e, login) {
        const payload = login.getPayload();
        resolve({ email: payload.email });
      }
    );
  });
}

module.exports.validateToken = validateToken;
