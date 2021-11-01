import chai from 'chai'
import chaiGraphQL from 'chai-graphql'
import supertest from "supertest"
import app from "../index.js"
import mongoose from 'mongoose'

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

describe('User section methods', () => {
    it('Fetch all users', (done) => {
        const query = `query {
            users {
              status
              users {
                name
                email
              }
            }
        }`
        request.get('/graphql')
        .send({ query })
        .end((err, res) => {
            if (err) return done(err);
            let data = res.body.data.users;
            assert.deepEqual(data.status, 200, 'Status is 200')
            assert.isArray(data.users, 'Users is an array of profiles')
            assert.isObject(data.users[0], 'User is an object of name and email')

            done();
        })
    })

    it('Fetch a single user with email present in database', (done) => {
        const query = `
        query {
            user(email: "aemie.j@gmail.com") {
              status
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
            let data = res.body.data.user
            assert.deepEqual(data.status, 200, 'Data is successful')
            assert.deepEqual(data.name, 'Aemie Jariwala')
            assert.deepEqual(data.email, 'aemie.j@gmail.com')
            done()
        })
    })

    it('Fetch a single user with email not present in database', (done) => {
        const query = `
        query {
            user(email: "sahil.bondre@gmail.com") {
              status
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
            let message = res.body.errors[0].message
            assert.deepEqual(message.statusCode, 403)
            done()
        })
    })

    it('Registers a user', (done) => {
        let body = {
            name: "Temp user 1",
            email: "temp.user1@gmail.com",
            password: "Test#123",
            gender: "male"
        };

        body = convertObjToString(body)

        let query = `
        mutation {
            registerUser(body: ${body}) {
              status
              name
              email
              gender
              profile
            }
          }
        `

        request.post('/graphql')
        .send({ query })
        .end((err, res) => {
            if (err) return done(err)
            let data = res.body.data.registerUser
            assert.deepEqual(data.status, 201)
            assert.deepEqual(data.name, 'Temp user 1')
            assert.deepEqual(data.email, 'temp.user1@gmail.com')
            assert.deepEqual(data.gender, 'male')
            done()
        })
    })

    it('Logins a user', (done) => {
        let body = {
            email: "aemie.j@gmail.com",
            password: "Testing#15"        
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

    it('Update user information', (done) => {
        let email = "aemie.j@gmail.com";
        let body = {
            name: "Aemie H Jariwala"
        };

        body = convertObjToString(body)

        let query = `
        mutation {
            updateUserInfo(email: "${email}", body: ${body}, accessToken: "${accessToken}") {
                status
                update {
                  name
                  profile
                  gender
                }
                email
                accessToken {
                  token
                  expires
                }
              }
          }
        `

        request.post('/graphql')
        .send({ query })
        .end((err, res) => {
            if (err) return done(err)
            let data = res.body.data.updateUserInfo
            assert.deepEqual(data.status, 201)
            let update = data.update
            assert.deepEqual(update.name, 'Aemie H Jariwala')
            done()
        })
    })

    it('Forgot password / reset password', (done) => {
        let email = "aemie.j@gmail.com";
        let password = "Testing#15";
        let rePass = "Testing#15";

        let query = `
        mutation {
            resetPass(email: "${email}", password: "${password}", rePass: "${rePass}") {
              message
              status
            }
        }
        `

        request.post('/graphql')
        .send({ query })
        .end((err, res) => {
            if (err) return done(err)
            let data = res.body.data.resetPass
            assert.deepEqual(data.status, 200)
            done()
        })
    })
})
