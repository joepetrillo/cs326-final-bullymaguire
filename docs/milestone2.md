# 1. API Documentation

## /user

#### /user/create (POST)

JSON Body:

```javascript
{
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
