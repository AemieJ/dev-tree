import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import supertest from "supertest"
import app from "../index.js"

chai.use(chaiGraphQL)
let assert = chai.assert
let request = supertest(app)
let accessToken = ""

const convertObjToString = (obj) => {
    let stringify = Object
        .entries(obj)
        .reduce((a, e) => {
          if (typeof e[1] != "function") {
            a += `${e[0]} : "${e[1]}", `;
          }
          return a;
        }, "`{")
        .slice(1, -2) + "}"
    return stringify
}

describe('🚀 Bookmark section methods', () => {
    it('Logins a user', (done) => {
        let body = {
            email: "kshitij.suri@gmail.com",
            password: "Test#123"        
        };

        body = convertObjToString(body)

        let query = `
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
            let data = res.body.data.loginUser
            assert.deepEqual(data.status, 200)
            let token = data.msg
            accessToken = token.accessToken.token
            assert.isObject(token.accessToken)
            assert.isObject(token.refreshToken)
            done()
        })
    })

    it('Inserting a bookmark', (done) => {
        let userEmail = "kshitij.suri@gmail.com";
        let email = "aemie.j@gmail.com";

        let query = `
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
            let data = res.body.data.insertBookmark
            assert.deepEqual(data.status, 201)
            assert.isArray(data.bookmarks)
            assert.lengthOf(data.bookmarks, 1)
            done()
        })
    })

    it('Fetching a bookmark', (done) => {
        let email = "kshitij.suri@gmail.com";

        let query = `
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
            let data = res.body.data.bookmarks
            assert.deepEqual(data.status, 200)
            assert.isArray(data.bookmarks)
            done()
        })
    })

    it('Removing a bookmark', (done) => {
        let userEmail = "kshitij.suri@gmail.com";
        let email = "aemie.j@gmail.com";

        let query = `
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
            let data = res.body.data.removeBookmark
            assert.deepEqual(data.status, 200)
            assert.isArray(data.bookmarks)
            assert.lengthOf(data.bookmarks, 0)
            done()
        })
    })
})
