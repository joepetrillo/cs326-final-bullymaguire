## 1. API Documentation


# [Users](https://documenter.getpostman.com/view/19056541/UVyvvEdX)

## Use these API calls to create, read, update and delete users.

&nbsp;

## POST create user

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

## GET read user

- {{domain}}/users/{userid}

- Get the user matching the given user id in the url.

## PUT update user

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

## DEL delete user

- {{domain}}/users/{userId}

- Delete the user matching the given user id in the url.

&nbsp;

#

# [Posts](https://documenter.getpostman.com/view/19056541/UVyvvEdW)

## Use these API calls to create, read, update and delete posts.

&nbsp;

## POST create post

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

## GET read feed posts

- {{domain}}/posts?sort={sortType}

- Get all posts using the filter passed as a query parameter. The sort query parameter can be of type "top" or "latest".

<p>&nbsp;</p>

| PARAMS : |            |
| -------- | :--------: |
| sort     | {sortType} |

<p>&nbsp;</p>

## GET read specific post

- {{domain}}/posts/{postid}

- Get the post matching the given post id in the url.

## GET read user posts

- {{domain}}/users/{userid}/posts

- Get all posts made by the given user id in the url.

## PUT update post

- {{domain}}/posts/{postid}

- Update the like count of the post matching the given post id in the url. In the request body, include the id of the user that is liking or disliking the post.

### BODY :

```
{
    "userId": 123
}
```

## DEL delete post

- {{domain}}/posts/{postid}

- Delete the post matching the given post id in the url.

&nbsp;

#

# [Comments](https://documenter.getpostman.com/view/19056541/UVyvvEUi)

## Use these API calls to create, read, update and delete comments.

&nbsp;

## POST create comment

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

# Outline

## 2. Screenshots of Client Interface

## 3. URL of Heroku Application
URL: [https://tranquil-ravine-53779.herokuapp.com/](https://tranquil-ravine-53779.herokuapp.com/)

## 4. Division of Labor
- __Jack__: Upload Page, Signup Page, Feed Page, API Routes, API Design
- __Ashir__: Song Page, Beat Page, Feed Page, Profile Page, API Routes, API Design
- __Joe__: Account Page, Styling, Navigation, Feed Page, API Routes, API Design
- __Alex__: Feed Page, Profile Page, Beat Page, API Routes, API Design

Worked largely together on the API, initial implentation of API, and Feed Page of the website


2. At least one set of four screenshots of your client interface with descriptions
