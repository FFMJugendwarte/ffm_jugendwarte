const currentHost = window.location.hostname;

let redirectBase = 'https://ffmjw.leitnersoft.com';

if (currentHost.includes('testffmjw')) {
  redirectBase = 'https://testffmjw.leitnersoft.com';
} else if (currentHost.includes('localhost')) {
  redirectBase = 'http://localhost:5173';
}

const awsmobile = {
  aws_project_region: 'eu-central-1',
  aws_cognito_region: 'eu-central-1',
  aws_user_pools_id: 'eu-central-1_4AY11Vz5D',
  aws_user_pools_web_client_id: '7ldra5pg0gfi0g6d2d6o55gcs4',
  oauth: {
    domain: 'eu-central-14ay11vz5d.auth.eu-central-1.amazoncognito.com',
    redirectSignIn: `${redirectBase}/login`,
    redirectSignOut: `${redirectBase}/logout`,
    responseType: 'code',
    scope: ['email', 'openid', 'profile']
  }
};

export default awsmobile;

