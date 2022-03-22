const Hapi        = require('@hapi/hapi');
const hapiAuthJWT = require('./node_modules/hapi-auth-jwt2/lib/');
const JWT         = require('jsonwebtoken');  // used to sign our content
const port        = process.env.PORT || 3000; // allow port to be set

const secret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!

const validAuthProviders = ["SSO", "user-pass"]

const validate = async function (decoded, request, h) {
  var idxEmail = decoded.email.indexOf('@parsleyhealth.com');
  var authProvider = decoded['auth-provider'];
  console.log(decoded);
  if (idxEmail > -1 && validAuthProviders.indexOf(authProvider) > -1) {
    return { isValid : true };
  } else {
    return { isValid : false };
  }
};

const init = async() => {
  const server = new Hapi.server({ port: port });
  await server.register(hapiAuthJWT);
  server.auth.strategy('jwt', 'jwt',
  { key: secret,
    validate,
    verifyOptions: { ignoreExpiration: true }
  });

  server.auth.default('jwt');

  server.route([
    {
      method: "GET", path: "/", config: { auth: false },
      handler: function(request, h) {

        return {text: 'Token not required'};
      }
    },
    {
      method: 'GET', path: '/senior-parsley', config: { auth: 'jwt' },
      handler: function(request, h) {
        const response = h.response({message: 'You used a Valid JWT Token to access /senior-parsley endpoint!'});
        response.header("Authorization", request.headers.authorization);

        return response;
      }
    }
  ]);
  await server.start();
  return server;
};

init().then(server => {
  console.log('Server running at:', server.info.uri);
}).catch(err => {
  console.log(err);
});
