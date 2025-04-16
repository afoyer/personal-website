import { Amplify } from 'aws-amplify'
import { NextServer } from '@aws-amplify/adapter-nextjs'
import outputs from '../../../amplify_outputs.json'

const config = {
  Auth: {
    Cognito: {
      userPoolId: outputs.auth.user_pool_id,
      userPoolClientId: outputs.auth.user_pool_client_id,
      identityPoolId: outputs.auth.identity_pool_id,
      region: outputs.auth.aws_region,
      loginWith: {
        oauth: {
          domain: outputs.auth.oauth.domain,
          scopes: outputs.auth.oauth.scopes,
          redirectSignIn: outputs.auth.oauth.redirect_sign_in_uri,
          redirectSignOut: outputs.auth.oauth.redirect_sign_out_uri,
          responseType: outputs.auth.oauth.response_type as 'code' | 'token'
        }
      }
    }
  }
}

console.log('Amplify config:', JSON.stringify(config, null, 2))

Amplify.configure(config, {
  ssr: true
})

export { Amplify } 