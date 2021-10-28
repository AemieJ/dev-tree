# Dev Tree
Linktree is a known product that helps in storing the links of a user and gives a single page 
showcasing all the links. Dev-tree is a product that helps in storing the important links of a developer i.e, linkedin, youtube videos, blogs written on devto, medium, etc and github repositories. This specification helps in better judgement and understanding of a developer skills. Thus, dev tree not only creates a shareable page for a developer but a complete dashboard where each developer's public tree is displayed and can be bookmarked. 

## Model: User
```
name: String
email: String
password: String (stored in hash) 
token: {
    accessToken: {
        token: String
        expires: Integer (in epoch)
    }
    refreshToken: {
        token: String
        expires: Integer (in epoch)
    }
}
gender: String (male / female)
profile: String (image url)
```

### Methods 
1. Fetching a user information 
2. Register with user information (using the model values - {token})
3. Login with mail and password (token object generated => refreshToken stored in database) 
4. Forgot/change password flow: send mail with user's mail and refreshToken link, once link clicked from mail, url is verified based on mail and refreshToken, change password feature is available then, after which login is performed again. 
5. Update user information ( user model - {email, password, token})
