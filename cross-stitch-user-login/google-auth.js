const https = require('https');
const querystring = require('querystring');

function validateToken(id_token) {
  var postData = querystring.stringify({
    id_token: id_token
  });

  var options = {
    hostname: 'www.googleapis.com',
    path: '/oauth2/v3/tokeninfo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    var req = https.request(options, (res) => {
      var status = res.statusCode;

      res.setEncoding('utf8');
      var json_string = '';
      res.on('data', (chunk) => {
        json_string += chunk;
      });

      res.on('end', () => {
        var response_json = JSON.parse(json_string);
        if (response_json.error_description) {
          reject({
            error: response_json.error_description
          });
          return;
        }
        if (!isValid(response_json)) {
          reject({
            error: 'token id is invalid'
          });
          return;
        }

        resolve({
          email: response_json.email
        });
      });
    });

    req.on('error', (e) => {
      reject({
        error: e.message
      });
    });

    // write data to request body
    req.write(postData);
    req.end();
  });
}

function isValid(response_json) {
  // Based on "Calling the tokeninfo endpoint":
  // https://developers.google.com/identity/sign-in/web/backend-auth

  // ***NOTE:***
  // You should create your own client ID via these instructions:
  // https://developers.google.com/identity/sign-in/web/devconsole-project
  // ***This client ID WILL BE DELETED by the end of the quarter, so please
  // create your own!!!***
  const CLIENT_ID =
		'779951118654-9fc4i79pl2qqqet6cs25tbq2ng1dkrip.apps.googleusercontent.com';
  var aud = response_json.aud;
  return aud == CLIENT_ID;
}

var exports = module.exports = {};
exports.validateToken = validateToken;
