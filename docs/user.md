# Graphql User Model Methods 

## 1. Fetching User Details
With this endpoint, it doesn't require any access token as any user logged in or not can view a user details such as name, email, gender etc. In this, if a user clicks on author name, there will be a email of the author attached to it which will help for calling the endpoint.
<br/>

### Input 
```javascript
let email =  "aemie.j@gmail.com";
```

### Query
```
query {
  user(email: ${email}) {
    name
    email
    profile
  }
}
```

## 2. Registeration of User 
To register, a form will be provided to ask for the name, email, password, gender and each user field which will then be passed to the endpoint. 
<br/>

### Input
```javascript
let body = {
    name: "Aemie H Jariwala",
    email: "aemie.j@gmail.com",
    password: "Test#123",
    gender: "female"
};
```

### Query
```
mutation {
  registerUser(body: ${body}) {
    name
    email
    gender
    profile
  }
}
```

## 3. Login User
After registeration is complete, user will be directed to the login page where they can login with their credentials. Once, login is successfully done, a token object will be generated where the access token will be saved on frontend and refresh token will be saved on the database. This tokens are required for secure authentication and usage of various other endpoints. Also, the login time will be saved in database so the frontend can know whether the user is first time login or not. 
<br/>

### Input
```javascript
let body = {
    email: "aemie.j@gmail.com",
    password: "Test#123"
};
```

### Query
```
mutation {
  loginUser(body: ${body}) {
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
```

## 4. Update User
A user can update its detail only after successful login. Thus, to use this endpoint access token is required. Thus anything, the body excluding the email will be sent from frontend along with the token where the information will be updated. Once, update is done details are fetched and provided back to the frontend. 
<br/>

### Input
```javascript
let email = "aemie.j@gmail.com";
let body = {
    name: "Aemie Jariwala"
};
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlbWllLmpAZ21haWwuY29tIiwiaWF0IjoxNjM1NDI5OTg4LCJleHAiOjE2MzU0MzA1ODh9.QFPwkHmUpwc2OmShn_XsyMkfkc4GAIrkUUyDFYXfB-Y";
```

### Query
```
mutation {
  updateUserInfo(email: ${email}, body: ${body}, accessToken: ${accessToken}) {
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
```

## 5. Forgot Password - Send Mail (step 1)
A user cannot use the update user endpoint for changing passwords or when user forgets password. It has to follow a highly secure flow and for this purpose, in step 1 when user wants to change password a url is mailed which includes the refresh token and email. 
<br/>

### Input 
```javascript
let email = "aemie.j@gmail.com";
```

### Query
```
mutation {
  forgotPass(email: ${email}) {
    email
    message
  }
}
```

## 6. Forgot Password - Validate URL for pass change request (step 2)
After the url sent to the mail is clicked it is validated to check the refresh token and mail. After the verification of the email is performed, it is then redirected to the change password page.
<br/>

### Input
```javascript
let email = "aemie.j@gmail.com";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlbWllLmpAZ21haWwuY29tIiwiaWF0IjoxNjM1NDI5OTg4LCJleHAiOjE2MzU2ODkxODh9.8iZ6S7EyNGobN-5t6JV1lhh7u1jFPpaSyeY7FoeaLvs"; // refresh token
```

### Query
```
query {
  isCorrectResetURL(email: ${email}, token: ${token}) 
}
```

## 7. Forgot Password - Password change (step 3)
This is the final stage where the user is provided a page for changing the password and then redirected to the login page to login with the new credentials.
<br/>

### Input 
```javascript
let email = "aemie.j@gmail.com";
let password = "Testing#15";
let rePass = "Testing#15";
```

### Query
```
mutation {
  resetPass(email: ${email}, password: ${password}, rePass: ${rePass})
}
```
