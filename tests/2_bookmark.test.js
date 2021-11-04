import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import supertest from 'supertest'
import app from '../index.js'

chai.use(chaiGraphQL)
const assert = chai.assert
const request = supertest(app)
let accessToken = ''

const convertObjToString = (obj) => {
  const stringify = Object
    .entries(obj)
    .reduce((a, e) => {
      if (typeof e[1] !== 'function') {
        a += `${e[0]} : "${e[1]}", `
      }
      return a
    }, '`{')
    .slice(1, -2) + '}'
  return stringify
}

describe('🚀 Bookmark section methods', () => {
  it('Logins a user', (done) => {
    let body = {
      email: 'kshitij.suri@gmail.com',
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

  it('Inserting a bookmark', (done) => {
    const userEmail = 'kshitij.suri@gmail.com'
    const email = 'aemie.j@gmail.com'

    const query = `
        mutation {
            insertBookmark(userEmail: "${userEmail}", email: "${email}", accessToken: "${accessToken}") {
              status
              bookmarks
              accessToken {
                token
              }
            }
          }`

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.insertBookmark
        assert.deepEqual(data.status, 201)
        assert.isArray(data.bookmarks)
        assert.lengthOf(data.bookmarks, 1)
        done()
      })
  })

  it('Fetching a bookmark', (done) => {
    const email = 'kshitij.suri@gmail.com'

    const query = `
        query {
            bookmarks(email: "${email}", accessToken: "${accessToken}") {
              status
              bookmarks
              accessToken {
                token
              }
            }
          }`

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.bookmarks
        assert.deepEqual(data.status, 200)
        assert.isArray(data.bookmarks)
        done()
      })
  })

  it('Removing a bookmark', (done) => {
    const userEmail = 'kshitij.suri@gmail.com'
    const email = 'aemie.j@gmail.com'

    const query = `
        mutation {
            removeBookmark(userEmail: "${userEmail}", email: "${email}", accessToken: "${accessToken}") {
              status
              bookmarks
              accessToken {
                token
              }
            }
          }`

    request.post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) return done(err)
        const data = res.body.data.removeBookmark
        assert.deepEqual(data.status, 200)
        assert.isArray(data.bookmarks)
        assert.lengthOf(data.bookmarks, 0)
        done()
      })
  })
})
