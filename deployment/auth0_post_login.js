const fetch = require('node-fetch')

exports.onExecutePostLogin = async (event, api) => { 
  const SECRET = event.secrets.AUTH0_HOOK_SECRET
  if (event.user.app_metadata.localUserCreated) {
    return
  }

  const email = event.user.email
  const response = await fetch('https://app-starter-01.loca.lt/api/auth/hook', {
    method: 'post',
    body: JSON.stringify({ email, secret: SECRET }),
    headers: { 'Content-Type': 'application/json' },
  })
 
  const result = await response.json()
  if (response.status >= 400) {
    let error = `Error creating user: ${response.status} ${response.statusText}`
    if (result) {
        error += ` (${result.message || result})`
    }
    api.access.deny(error)
  } else {
    api.user.setAppMetadata('localUserCreated', true)
  }
}