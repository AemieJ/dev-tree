# Graphql Personal Model Methods 

## 1. Fetching Personal Details
To extract the tree view, the personal details of user will be required. It is easily extracted by the sending the email as an input.
<br/>

### Input 
```javascript
let email =  "aemie.j@gmail.com";
```

### Query
```
query {
  personal(email: ${email}) {
    status
    email
    id {
      youtube {
        id
        list
      }
    }
  }
}
```

## 2. Registeration of IDs 
After the user has registered and logged in for the **first time**, when the user clicks on personal id section on the profile page, it is asked for the registration of the ids [youtube, github and linkedin]. After user confirms their id, it is first approved to check if url exists upon which it is allowed to include that id. After registration, we create the input and add it in the following method. 
<br/>

### Input
```javascript
let email = "aemie.j@gmail.com";
let body = {
  youtubeID: "https://www.youtube.com/channel/UCs6QxQabcPLfg7CVFWfAeLg",
  youtubeList: []
};
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlbWllLmpAZ21haWwuY29tIiwiaWF0IjoxNjM1NDI5OTg4LCJleHAiOjE2MzU0MzA1ODh9.QFPwkHmUpwc2OmShn_XsyMkfkc4GAIrkUUyDFYXfB-Y";
```

### Query
```
mutation {
  insertPersonalID(email: ${email}, body: ${body}, accessToken: ${accessToken}) {
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
}
```

## 3. Updating an ID list 
A user can update the list of urls within an id but can't edit the id itself. To edit the personal id, the id needs to be deleted and re inserted. So within the input, your send the updated list associated with the personal id. 
<br/>

### Input
```javascript
let email = "aemie.j@gmail.com";
let body = {
  youtubeList: ["https://www.youtube.com/watch?v=_-FUYcP5ghw"]
};
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlbWllLmpAZ21haWwuY29tIiwiaWF0IjoxNjM1NDI5OTg4LCJleHAiOjE2MzU0MzA1ODh9.QFPwkHmUpwc2OmShn_XsyMkfkc4GAIrkUUyDFYXfB-Y";
```

### Query
```
mutation {
  updatePersonalID(email: ${email}, body: ${body}, accessToken: ${accessToken}) {
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
}
```

## 4. Delete an ID
To delete an id, you need to specify the email and account name i.e. if you want to delete the youtube from the tree view, you mention `acc="youtube"`. After the account is deleted, you can insert a new id for that account.
<br/>

### Input
```javascript
let email = "aemie.j@gmail.com";
let acc = "youtube";
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlbWllLmpAZ21haWwuY29tIiwiaWF0IjoxNjM1NDI5OTg4LCJleHAiOjE2MzU0MzA1ODh9.QFPwkHmUpwc2OmShn_XsyMkfkc4GAIrkUUyDFYXfB-Y";
```

### Query
```
mutation {
  deletePersonalID(email: ${email}, acc: ${acc}, accessToken: ${accessToken}) {
    status
    message
    status
    accessToken {
      token
    }
  }
}
```

## 5. Inserting the new ID after registration has taken place
This is only possible after the registration of an id is done after first-time login. You can create an id if it doesn't exist in the database already.
<br/>

### Input 
```javascript
let email = "aemie.j@gmail.com";
let body = {
  id: "https://www.youtube.com/channel/UCs6QxQabcPLfg7CVFWfAeLg",
  list: ["https://www.youtube.com/watch?v=_-FUYcP5ghw"],
  account: "youtube"
};
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFlbWllLmpAZ21haWwuY29tIiwiaWF0IjoxNjM1NDI5OTg4LCJleHAiOjE2MzU0MzA1ODh9.QFPwkHmUpwc2OmShn_XsyMkfkc4GAIrkUUyDFYXfB-Y";
```

### Query
```
mutation {
  addPersonalID(email: ${email}, body: ${body}, accessToken: ${accessToken}) {
    status
    email
    id {
      youtube {
        id
      }
    }
    accessToken {
      token
    }
  }
}
```