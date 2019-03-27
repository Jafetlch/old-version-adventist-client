export function credentials (email, pwd) {
  return {
    grant_type: 'password',
    client_id: 2,
    client_secret: 'm3E4fZXx9OBJLZ8WGJHiRDKAfUUOfVucQNCzmCQY',
    username: email,
    password: pwd
  }
}
