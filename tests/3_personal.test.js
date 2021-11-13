import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import supertest from 'supertest'
import app from '../server.js'

chai.use(chaiGraphQL)
const assert = chai.assert
const request = supertest(app)
let accessToken = ''; let isFirstTimeLogin = false

const convertObjToString = (obj) => {
  const stringify = Object
    .entries(obj)
    .reduce((a, e) => {
      if (typeof e[1] !== 'function' && Array.isArray(e[1]) === false) {
        a += `${e[0]} : "${e[1]}", `
      }

      if (Array.isArray(e[1])) {
        a += `${e[0]} : ${JSON.stringify(e[1])}`
      }
      return a
    }, '`{')
    .slice(1, -2) + '}'
  return stringify
}

describe('🚀 Tree View user ID section methods', () => {
  it('Logins a user', (done) => {
    let body = {
      email: 'temp.user1@gmail.com',
      password: 'Test#123'
    }

    body = convertObjToString(body)

    const query = `
        mutation {
            loginUser(body: ${body}) {
              status

              msg {
                accessToken {
                    token
                    expires
                }
                refreshToken {
                    token
                    expires
                }
              }
            }
          }
        `

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.loginUser
        assert.deepEqual(data.status, 200)
        const token = data.msg
        accessToken = token.accessToken.token
        assert.isObject(token.accessToken)
        assert.isObject(token.refreshToken)
        done()
      })
  })

  it('Fetches user details', (done) => {
    const query = `
        query {
            user(email: "temp.user1@gmail.com") {
              status
              isFirstTimeLogin
              name
              email
              profile
            }
          }
        `

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.user
        assert.deepEqual(data.status, 200, 'Data is successful')
        isFirstTimeLogin = data.isFirstTimeLogin
        done()
      })
  })

  it('Fetch personal ID Detail', (done) => {
    const email = 'kshitij.suri@gmail.com'

    const query = `
      query {
        personal(email: "${email}") {
          status
          email
          id {
            youtube {
              id
              list
            }
          }
        }
      }`

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.personal
        assert.deepEqual(data.status, 200)
        assert.isObject(data.id)
        done()
      })
  })

  it('Register a personal ID', (done) => {
    const email = 'temp.user1@gmail.com'
    const body = `{
      youtubeID: "https://www.youtube.com/channel/UCs6QxQabcPLfg7CVFWfAeLg",
      youtubeList: []
    }`

    const query = `
    mutation {
      insertPersonalID(email: "${email}", body: ${body}, accessToken: "${accessToken}") {
        status
        id {
          youtube {
            id
          }
        }
        accessToken {
          token
          expires
        }
      }
    }`

    if (isFirstTimeLogin) {
      request.post('/graphql')
        .send({ query })
        .end((err, res) => {
          if (err) return done(err)
          const data = res.body.data.insertPersonalID
          assert.deepEqual(data.status, 201)
          assert.isObject(data.id)
          done()
        })
    } else {
      done()
    }
  })

  it('Updating an ID list', (done) => {
    const email = 'temp.user1@gmail.com'
    const body = `{
      youtubeList: ["https://www.youtube.com/watch?v=_-FUYcP5ghw"]
    }`

    const query = `
    mutation {
      updatePersonalID(email: "${email}", body: ${body}, accessToken: "${accessToken}") {
        status
        id {
          youtube {
            id
            list
          }
        }
        accessToken {
          token
        }
      }
    }`

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.updatePersonalID
        assert.deepEqual(data.status, 200)
        const youtubeID = data.id.youtube.id
        const list = data.id.youtube.list
        assert.deepEqual(youtubeID, 'https://www.youtube.com/channel/UCs6QxQabcPLfg7CVFWfAeLg')
        assert.lengthOf(list, 1)

        done()
      })
  })

  it('Deleting an ID', (done) => {
    const email = 'temp.user1@gmail.com'
    const acc = 'youtube'

    const query = `
    mutation {
      deletePersonalID(email: "${email}", acc: "${acc}", accessToken: "${accessToken}") {
        status
      }
    }`

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.deletePersonalID
        assert.deepEqual(data.status, 200)
        done()
      })
  })

  it('Inserting a new ID', (done) => {
    const email = 'temp.user1@gmail.com'
    const body = `{
      id: "https://www.youtube.com/channel/UCs6QxQabcPLfg7CVFWfAeLg",
      list: ["https://www.youtube.com/watch?v=_-FUYcP5ghw"],
      account: "youtube"
    }`

    const query = `
    mutation {
      addPersonalID(email: "${email}", body: ${body}, accessToken: "${accessToken}") {
        status
        email
        id {
          youtube {
            id
          }
        }
      }
    }
    `

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.addPersonalID
        assert.deepEqual(data.status, 200)
        done()
      })
  })
})
