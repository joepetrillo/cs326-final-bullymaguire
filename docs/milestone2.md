# 1. API Documentation

## User

These are the API calls for working with users on Lone Music, which includes creating, editing, deleting, and grabbing information from users.

#### /user/create/{id} (POST)

This API call allows for the creation of a user on Lone Music. Users are assigned IDs, and also have email address, username, and password information stored in the database. It returns a body in JSON form with these fields, along with the "confirm password" field from the signup page for verifying the password in the backend. The response returns a status in the form of JSON as well, indiciating the success or failure of the API call.

JSON Body:

```javascript
{
    id: 123
    email: "example@gmail.com",
    username: "ashir",
    password: "pass1234",
    confirm_password: "pass1234"
}
```

Response:

##### On Success:

```javascript
{
  createStatus: `Successfully created ${username}`;
}
```

##### On Failure:

```javascript
{
  createStatus: `Error creating ${username}`;
}
```

#### /user/read?username={userName} (GET)

This API call allows for retrieving the information of a user on Lone Music. The response returns three fields relating to the user: a database link to their profile picture, the username, as well as their id, all the form of JSON , or a failure message if there is an error.

Response:

##### On Success:

```javascript
{
  img: "image-link.com"
  username: "ashir",
  id: "id"
}
```

##### On Failure:

```javascript
{
  getStatus: `Could not find ${userName}`;
}
```

#### /user/update?type={updateType} (PUT)

This API call allows for updating the information of a user on Lone Music. The URL path contains a query called `type`, which determines which portion of the user's information is being updated. This type can be `email, name, password`. It returns a body in JSON form with the new fields, depending on the value of `type`. The response returns a status in the form of JSON as well, indiciating the success or failure of the API call.

JSON Body:

```javascript
type=email: {
    email: "newEmail@gmail.com",
}
type=name: {
    newFirstName: "Joe",
    newLastName: "Petrillo"
}
type=password: {
    newPassword: "new1234",
    newConfirmPassword: "new1234",
}
```

Response:

##### On Success:

```javascript
{
  updateStatus: `Successfully updated ${username}`;
}
```

##### On Failure:

```javascript
{
  updateStatus: `Error updating ${username}`;
}
```

#### /user/delete?username={userName} (DELETE)

This API call allows for deleting a user on Lone Music. The response returns a status in the form of JSON, indiciating the success or failure of the API call.

Response:

##### On Success:

```javascript
{
  deleteStatus: `Successfully deleted ${username}`;
}
```

##### On Failure:

```javascript
{
  deleteStatus: `Error deleting ${username}`;
}
```

## /instrumental
These are the API calls for working with instrumental data, which includes creating, editing,and updating beat information 
#### Create Instrumental (upload) (POST)
#### /beat/create
This API call allows for creation of a beat. Beats are assigned a title, genre, username and audio file, and returns a body in JSON of each item. The response returns the status in JSON indicating if the API call was a success or failure.

JSON Body:

```javascript
{
    title: "beat1",
    genre: "rap",
    audio_file: "https://www.audio.com/example.mp3",
    user_name: "jack"
    
}
```

Response:

##### On Success:

```javascript
{
  createStatus: `Successfully created ${title}`;
}
```

##### On Failure:

```javascript
{
  createStatus: `Error creating ${title}`;
}
```

#### Read Instrumental (GET)
#### /beat/read?beatID=123
This API call retrieves current beat data associated with their corresponding beat ID. The response returns the title, genre, username, upvotes/downvotes

Response:

##### On Success:

```javascript
{
  title: "beat1",
  genre: "rap",
  audio: "https://www.audio.com/example.mp3",
  upvotes: 0,
  downvotes: 0

}
```

##### On Failure:

```javascript
{
  getStatus: `Could not find ${beatID}`;
}
```

#### /beat/read/feed?types
Retrieves an array of beats for feed, 10 by default. 

Response:

##### On Success:

```javascript
beats:  
  [{  
  title: "beat1",
  genre: "rap",
  audio: "https://www.audio.com/example.mp3",
  upvotes: 0,
  downvotes: 0
  },
    {  
  title: "beat2",
  genre: "country",
  audio: "https://www.audio.com/example2.mp3",
  upvotes: 0,
  downvotes: 0
  }...  
  ],
}
```

##### On Failure:

```javascript
{
  getStatus: `Could not find ${beats}`;
}
```

#### /beat/read/profile?userID=123
Retrieves an array of user beats, 10 by default.

Response:

##### On Success:

```javascript
beats: { 
  [{  
  title: "beat1",
  genre: "rap",
  audio: "https://www.audio.com/example.mp3",
  upvotes: 0,
  downvotes: 0
  },
    {  
  title: "beat2",
  genre: "country",
  audio: "https://www.audio.com/example2.mp3",
  upvotes: 0,
  downvotes: 0
  }...  
  ],
}
```

##### On Failure:

```javascript
{
  getStatus: `Could not find ${userID}`;
}
```

#### Update Instrumental (PUT)
#### /beat/update?id=123&type=upvote|downvote
Retrieves updated upvote/downvote counter on beat.

Response:

##### On Success:

```javascript
{
 updateStatus: `Successfuly updated ${counter}`;
}
```
##### On Failure:

```javascript
{
  updateStatus: `Error updating ${counter}`;
}
```


#### Delete Instrumental (DELETE)
#### /beat/delete?id=123

Deletes beat with corresponding ID.

Response: 

##### On Success:

```javascript
{
 deleteStatus: `Successfuly deleted ${id}`;
}
```
##### On Failure:

```javascript
{
 deleteStatus: `Error deleting ${id}`;
}
```

## /vocals

#### Create Vocals (upload) (POST)

#### Read Vocals (GET)

#### Delete Vocals (DELETE)

## /comment

#### Create Comment (upload) (POST)

#### Read Comment (GET)

#### Delete Comment (DELETE)

# Outline

1. A brief and precise representation of APIs for you application
2. At least one set of four screenshots of your client interface with descriptions
3. The URL of your Heroku application
4. Division of labor summary

```

```
