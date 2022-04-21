## 1. API Documentation

## [Users](https://documenter.getpostman.com/view/19056541/UVyvvEdX)

Use these API calls to create, read, update and delete users.

### POST create user

- {{domain}}/users

- Create a new user. In the request body, include the email, username, password and confirmed password.

### BODY :

```
 {
  "email": "123@gmail.com",
  "username": "username",
  "password": "password",
  "confirm": "password"
  }
```

### GET read user

- {{domain}}/users/{userid}

- Get the user matching the given user id in the url.

### PUT update user

- {{domain}}/users/{userid}

- Update the email, password or profile picture of the user matching the given user id in the url. In the request body, include the type, email, password, confirmed password and the profile picture url. Type can be of "email", "password" or "picture". If certain fields are not being used, set to null.

### BODY :

```{
  "type": "email/password",
  "email": "123@gmail.com",
  "password": "password",
  "confirm": "password",
  "picture": "url of profile picture"
  }
```

### DEL delete user

- {{domain}}/users/{userId}

- Delete the user matching the given user id in the url.

## [Posts](https://documenter.getpostman.com/view/19056541/UVyvvEdW)

Use these API calls to create, read, update and delete posts.

### POST create post

- {{domain}}/posts

- Create a new post. In the request body, include the id of the user, title, genre and the url of the associated audio file. Also include the id of the instrumental parent post if this is a vocal response. If this is an instrumental, set the parent id to null.

### BODY :

```{
 "userId": 123,
 "title": "post title",
 "genre": "post genre",
 "audio": "url of audio file",
 "parentId": 123
 }
```

### GET read feed posts

- {{domain}}/posts?sort={sortType}

- Get all posts using the filter passed as a query parameter. The sort query parameter can be of type "top" or "latest".

<p>&nbsp;</p>

| PARAMS : |            |
| -------- | :--------: |
| sort     | {sortType} |

<p>&nbsp;</p>

### GET read specific post

- {{domain}}/posts/{postid}

- Get the post matching the given post id in the url.

### GET read user posts

- {{domain}}/users/{userid}/posts

- Get all posts made by the given user id in the url.

### PUT update post

- {{domain}}/posts/{postid}

- Update the like count of the post matching the given post id in the url. In the request body, include the id of the user that is liking or disliking the post.

### BODY :

```
{
    "userId": 123
}
```

### DEL delete post

- {{domain}}/posts/{postid}

- Delete the post matching the given post id in the url.

## [Comments](https://documenter.getpostman.com/view/19056541/UVyvvEUi)

Use these API calls to create, read, update and delete comments.

### POST create comment

- {{domain}}/posts/{postId}/comments

- Create a new comment. In the request body, include the id of the user, id of the post and the comment itself.

### BODY :

```
{
    "userId": 123,
    "postId": 123,
    "comment": "This is a comment"
}
```

### GET post comments

- {{domain}}/users/{userid}

### GET read user comments

- {{domain}}/users/{userid}/comments

### PUT read user comments

- {{domain}}/posts/{postId}/comments/{commentId}

### BODY :

```
{
    "userId": 123
}
```

### DELETE comment

- {{domain}}/posts/{postId}/comments/{commentId}

## 2. Screenshots of Client Interface

### CREATE
This is the Beat Upload page, and is the primary Create operation in our app. This allows the user to upload a beat file, with an associated title and genre. It then is added to our in memory storage (javascript array of objects), and can be viewed on the Feed Page, its own Thread, or the user's profile. It POSTs to /posts.

![](https://cdn.discordapp.com/attachments/941059461764751420/966545656003051601/create.png)

### READ
This is the feed page. This is a primary Read operation on our application. We read in all posts from our local memory (javavscript array (does not persist)), and display them in the UI along with associated comments and data indicating the user who posted the Beat. It GETs from /posts, /comments, and /user/userId

![](https://cdn.discordapp.com/attachments/941059461764751420/966545656288268369/read.png)

### UPDATE
This is the Account page. This is a primary UPDATE operation on our application. We update all user data, such as profile picture, email address, and new password.

![](https://cdn.discordapp.com/attachments/941059461764751420/966545656518959144/update.png)

### DELETE
This is the User's personal profile page. This is the only entry point in our application for the DELETE operation. On this page, a user is capable of deleting any of their Posts (Beats or Songs), and Comments, using a delete icon (trash can). It sends DELETE HTTP requests to /posts/postId and /posts/postId/comments/commentId

![](https://cdn.discordapp.com/attachments/941059461764751420/966545656804175872/delete.png)

## 3. URL of Heroku Application
URL: [https://tranquil-ravine-53779.herokuapp.com/](https://tranquil-ravine-53779.herokuapp.com/)

## 4. Division of Labor
- __Jack__: Upload Page, Signup Page, Feed Page, API Routes, API Design
- __Ashir__: Song Page, Beat Page, Feed Page, Profile Page, API Routes, API Design
- __Joe__: Account Page, Styling, Navigation, Feed Page, API Routes, API Design
- __Alex__: Feed Page, Profile Page, Beat Page, API Routes, API Design

Worked largely together on the API, initial implentation of API, and Feed Page of the website
