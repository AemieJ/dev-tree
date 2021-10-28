# Dev Tree
Linktree is a known product that helps in storing the links of a user and gives a single page 
showcasing all the links. Dev-tree is a product that helps in storing the important links of a developer i.e, linkedin, youtube videos, blogs written on devto, medium, etc and github repositories. This specification helps in better judgement and understanding of a developer skills. Thus, dev tree not only creates a shareable page for a developer but a complete dashboard where each developer's public tree is displayed and can be bookmarked. 

## Model: User
This model encompasses the user information. 

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
4. Forgot/change password flow: send mail with user's mail and refreshToken link, once link clicked from mail, url is verified based on mail and refreshToken, change password feature is available then, after which login is performed again
5. Update user information ( user model - {email, password, token})

## Model: Personal ID
After successful login, the user is allowed to add personal ID. Personal ID, in the context of the product, are the IDs that is specifically under the user. For example, a user can create videos under its own youtube channel and also in collaboration with other organization but personal ID only takes into account of videos under its own yt channel. 

```
email: String
youtube: {
    id: String (user's own youtube channel link)
    list: Array (list of 3 videos from user's channel)
}
```

### Methods 
1. Fetching a user's personal ID information
2. Register user's personal ID when the user logs in for the first time. Here, when an id is inserted it is sent for approval to check if url exists, once each ID is verified and the IDS are registered into the database with empty/auto-generated list through web scraping
3. A user's personal ID can not be updated however user's list pertaining to the ID can be updated by user. There is a specified number of items allowed in the list. If the user wants to add in addition to the speicified number is not possible and user needs to delete a particular list from the array (deletion of array will take from front-end and the final array list will be sent to server for updating the array).
4. To change the personal ID, the only method is to delete the existing ID and then register with the new personal ID
