import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_R8HECeYpb', // <- aus dem Screenshot
    userPoolWebClientId: '615b0u7h0d788m791ru47jpgcd', // <- Client ID ohne Secret
    oauth: {
      domain: 'https://eu-central-1r8heceypb.auth.eu-central-1.amazoncognito.com/', // <- dein Domainname
      redirectSignIn: 'https://ffmjw.leitnersoft.com/',
      redirectSignOut: 'https://ffmjw.leitnersoft.com/',
      responseType: 'code',
      scope: ['email', 'openid', 'profile']
    }
  }
})
