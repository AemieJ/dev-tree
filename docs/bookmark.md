# Graphql Bookmark Model Methods 

## 1. Fetching bookmarks 
Bookmarks are only visible to authenticated user and its their own personal bookmarks of saved profiled. Thus, to fetch bookmarks email and accesstoken is required which will return a list of emails.
<br/>

### Input 
```javascript
let email = "payal.sharma@gmail.com";
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBheWFsLnNoYXJtYUBnbWFpbC5jb20iLCJpYXQiOjE2MzU2MDI2ODQsImV4cCI6MTYzNTYwMzI4NH0.Jh7tGL05g_i_wyv-0Db94zxpy5IfoHgtXhEq_c1pYsc";
```

### Query 
```
query {
  bookmarks(email: ${email}, accessToken: ${accessToken}) {
    bookmarks
    accessToken {
      token
    }
  }
}
```

## 2. Adding bookmark
When an authenticated user (user 1) likes an another authenticated user's (user 2) dev-tree, user 1 can save that and the function will be called to add the user 2 email in the bookmarks list of user 1.
<br/>

### Input
```javascript
let userEmail = "payal.sharma@gmail.com";
let email = "aemie.j@gmail.com";
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBheWFsLnNoYXJtYUBnbWFpbC5jb20iLCJpYXQiOjE2MzU2MDI2ODQsImV4cCI6MTYzNTYwMzI4NH0.Jh7tGL05g_i_wyv-0Db94zxpy5IfoHgtXhEq_c1pYsc";
```

### Query
```
mutation {
  insertBookmark(userEmail: ${userEmail}, email: ${email}, accessToken: ${accessToken}) {
    bookmarks
    accessToken {
      token
    }
  }
}
```

## 3. Removing bookmark
<br/>

### Input
```javascript
let userEmail = "payal.sharma@gmail.com";
let email = "aemie.j@gmail.com";
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBheWFsLnNoYXJtYUBnbWFpbC5jb20iLCJpYXQiOjE2MzU2MDI2ODQsImV4cCI6MTYzNTYwMzI4NH0.Jh7tGL05g_i_wyv-0Db94zxpy5IfoHgtXhEq_c1pYsc";
```

### Query 
```
mutation {
  removeBookmark(userEmail: $userEmail, email: $email, accessToken: $accessToken) {
    bookmarks
    accessToken {
      token
    }
  }
}
```