'use client'

import { useEffect } from 'react'
import { Amplify } from 'aws-amplify'
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
  },
  API: {
    GraphQL: {
      endpoint: outputs.data.url,
      region: outputs.data.aws_region,
      defaultAuthMode: 'userPool' as const
    }
  }
}

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log(
      'Configuring Amplify on client side with config:',
      JSON.stringify(config, null, 2)
    )
    Amplify.configure(config, { ssr: true })
  }, [])

  return <>{children}</>
}
