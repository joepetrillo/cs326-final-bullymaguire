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

#### Create Instrumental (upload) (POST)

#### Read Instrumental (GET)

#### Delete Instrumental (DELETE)

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
