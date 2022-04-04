# 1. API Documentation

## User

These are the API calls for working with users on Lone Music, which includes creating, editing, deleting, and grabbing information from users.

#### /user/create/{id} (POST)

This API call allows for the creation of a user on Lone Music. Users are assigned IDs, and also have email address, username, and password information stored in the database. It returns a body in JSON form with these fields, along with the "confirm password" field from the signup page for verifying the password in the backend. The response returns a status in the form of JSON as well, indiciating the success or failure of the API call.

JSON Body:

```JSON
{
    "id": 123,
    "email": "example@gmail.com",
    "username": "ashir",
    "password": "pass1234",
    "confirm_password": "pass1234"
}
```

Response:

##### On Success:

```JSON
{
  "createStatus": "Successfully created ${username}"
}
```

##### On Failure:

```JSON
{
  "createStatus": "Error creating ${username}"
}
```

#### /user/read?username={userName} (GET)

This API call allows for retrieving the information of a user on Lone Music. The response returns three fields relating to the user: a database link to their profile picture, the username, as well as their id, all the form of JSON , or a failure message if there is an error.

Response:

##### On Success:

```JSON
{
  "img": "image-link.com",
  "username": "ashir",
  "id": "id"
}
```

##### On Failure:

```JSON
{
  "getStatus": "Could not find ${userName}"
}
```

#### /user/update?type={updateType} (PUT)

This API call allows for updating the information of a user on Lone Music. The URL path contains a query called `type`, which determines which portion of the user's information is being updated. This type can be `email, name, password`. It returns a body in JSON form with the new fields, depending on the value of `type`. The response returns a status in the form of JSON as well, indiciating the success or failure of the API call.

JSON Body:

```JSON
// if type is email
{
    "email": "newEmail@gmail.com",
}
// if type is name
{
    "newFirstName": "Joe",
    "newLastName": "Petrillo"
}
// if type is password
{
    "newPassword": "new1234",
    "newConfirmPassword": "new1234",
}
```

Response:

##### On Success:

```JSON
{
  "updateStatus": "Successfully updated ${username}"
}
```

##### On Failure:

```JSON
{
  "updateStatus": "Error updating ${username}"
}
```

#### /user/delete?username={userName} (DELETE)

This API call allows for deleting a user on Lone Music. The response returns a status in the form of JSON, indiciating the success or failure of the API call.

Response:

##### On Success:

```JSON
{
  "deleteStatus": "Successfully deleted ${username}"
}
```

##### On Failure:

```JSON
{
  "deleteStatus": "Error deleting ${username}"
}
```

## /instrumental

These are the API calls for working with instrumental data, which includes creating, editing,and updating beat information

#### Create Instrumental (upload) (POST)

#### /beat/create

This API call allows for creation of a beat. Beats are assigned a title, genre, username and audio file, and returns a body in JSON of each item. The response returns the status in JSON indicating if the API call was a success or failure.

JSON Body:

```JSON
{
    "title": "beat1",
    "genre": "rap",
    "audio_file": "https://www.audio.com/example.mp3",
    "user_name": "jack"

}
```

Response:

##### On Success:

```JSON
{
  "createStatus": "Successfully created ${title}"
}
```

##### On Failure:

```JSON
{
  "createStatus": "Error creating ${title}"
}
```

#### Read Instrumental (GET)

#### /beat/read?beatID=123

This API call retrieves current beat data associated with their corresponding beat ID. The response returns the title, genre, username, upvotes/downvotes

Response:

##### On Success:

```JSON
{
  "title": "beat1",
  "genre": "rap",
  "audio": "https://www.audio.com/example.mp3",
  "upvotes": 0,
  "downvotes": 0
}
```

##### On Failure:

```JSON
{
  "getStatus": "Could not find ${beatID}"
}
```

#### /beat/read/feed?types

Retrieves an array of beats for feed, 10 by default.

Response:

##### On Success:

```JSON
[
  {
  "title": "beat1",
  "genre": "rap",
  "audio": "https://www.audio.com/example.mp3",
  "upvotes": 0,
  "downvotes": 0
  },
  {
  "title": "beat2",
  "genre": "country",
  "audio": "https://www.audio.com/example2.mp3",
  "upvotes": 0,
  "downvotes": 0
  }
]
```

##### On Failure:

```JSON
{
  "getStatus": "Could not find ${beats}"
}
```

#### /beat/read/profile?userID=123

Retrieves an array of user beats, 10 by default.

Response:

##### On Success:

```JSON
[
  {
  "title": "beat1",
  "genre": "rap",
  "audio": "https://www.audio.com/example.mp3",
  "upvotes": 0,
  "downvotes": 0
  },
  {
  "title": "beat2",
  "genre": "country",
  "audio": "https://www.audio.com/example2.mp3",
  "upvotes": 0,
  "downvotes": 0
  }
]
```

##### On Failure:

```JSON
{
  "getStatus": "Could not find ${userID}"
}
```

#### Update Instrumental (PUT)

#### /beat/update?id=123&type=upvote|downvote

Retrieves updated upvote/downvote counter on beat.

Response:

##### On Success:

```JSON
{
 "updateStatus": "Successfuly updated ${counter}"
}
```

##### On Failure:

```JSON
{
  "updateStatus": "Error updating ${counter}"
}
```

#### Delete Instrumental (DELETE)

#### /beat/delete?id=123

Deletes beat with corresponding ID.

Response:

##### On Success:

```JSON
{
 "deleteStatus": "Successfuly deleted ${id}"
}
```

##### On Failure:

```JSON
{
 "deleteStatus": "Error deleting ${id}"
}
```

## /vocals

The `/vocals` route is used for creating, reading, updating and deleting vocals.

- `/vocals/create`
- `/vocals/read`
- `/vocals/update`
- `/vocals/delete`

## `/comments`

The `/comments` route is used for creating, reading, updating and deleting comments.

- [`/comments/create`](#post-commentscreateidid) (POST) - used to create a new comment
- [`/comments/read`](#get-commentsreadtypetypeidid) (GET) - used to retrieve comment(s)
- [`/comments/update`](#put-commentsupdateidid) (PUT) - used to update an existing comment
- [`/comments/delete`](#delete-commentsdeleteidid) (DELETE) - used to delete an existing comment

Comments can be found on instrumental posts, vocal posts and user profiles. Each comment can be liked by other users, similiar to how TikTok, Instagram and Twitter operate. There is no implemention of any downvote or dislike system.

### `POST /comments/create?id={id}`

Create a comment that is associated with the post whose id matches the id parameter.

**Request Body Example**

```JSON
{
  "userId": "c13ec509-5267-4fac-aded-32cc87f914dd",
  "comment": "This is a really cool beat!"
}
```

**Response Example**

```JSON
{
  "status": "{success or failure}"
}
```

### `GET /comments/read?type={type}&id={id}`

Retrieve all comments associated with the user or post whose id matches the id parameter.

The type parameter can equal "instrumental", "vocal" or "user".

**Response Example**

```JSON
[
  {
    "commentId": "33a4bed2-8793-4797-a7f7-eceeb7ba022a",
    "userId": "c13ec509-5267-4fac-aded-32cc87f914dd",
    "username": "jpetrillo19",
    "comment": "This is a really cool beat!",
    "likeCount": 1234
  },
  {
    "commentId": "30ab4ee1-d333-4b93-bdd3-cda9d36fe916",
    "userId": "f6024d58-bb16-42dc-b8dd-a631dfeed05e",
    "username": "jackybeats",
    "comment": "This is super good.",
    "likeCount": 73
  }
]
```

### `PUT /comments/update?id={id}`

Increment the like count by one for the comment whose id matches the id parameter. If the user has already liked this particular comment, decrement the like count by one. The backend will handle the logic behind this.

**Request Body Example**

```JSON
{
  "userId": "c13ec509-5267-4fac-aded-32cc87f914dd"
}
```

**Response Example**

```JSON
{
  "status": "{success or failure}"
}
```

### `DELETE /comments/delete?id={id}`

Delete the comment whose id matches the id parameter.

**Response Example**

```JSON
{
  "status": "{success or failure}"
}
```

### `Data Stored`

This section serves to give a brief overview of the data our backend will store for each comment. This includes the comment id, the user id, the like count, the comment itself and the ids of users who liked the comment.

```JSON
{
  "commentId": "id",
  "userId": "id",
  "comment": "msg",
  "likeCount": 1234,
  "likes": [
    "id1", "id2", "id3", "id4"
  ]
}
```

# Outline

1. A brief and precise representation of APIs for you application
2. At least one set of four screenshots of your client interface with descriptions
3. The URL of your Heroku application
4. Division of labor summary
