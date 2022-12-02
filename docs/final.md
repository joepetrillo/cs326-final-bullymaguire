# CS326 BullyMaguire Team Submission

## **Title:** Team Bully Maguire

## **Subtitle:** Lone Music

## **Semester:** Spring 2022 Semester

## **Link to Final Project:**
- [https://lonemusic.herokuapp.com/](https://lonemusic.herokuapp.com/)

## **Overview:**

Lone Music is a platform where both creators and listeners alike can go to discover new music in a way never seen before. Most music is made up of instrumentals and vocals, combined with one another resulting in a single finalized sound. During the recording process, the instrumental (or beat) is usually made first and it is then up to the vocalist (or rapper) to add lyrics. Lone Music provides users with a new take on music, making it possible to hear many different versions of vocals over the same instrumental. As with most social medias, a ranking (or popularity) system will be in place allowing the instrumentals and vocals the ability to be or not to be liked.

Lone Music is inspired by BeatStars, SoundCloud and Kanye West's new "Stem Player". BeatStars is an online platform where people can go to purchase beats to use in their own music. SoundCloud is a popular site for both emerging and established artists to post their music. The "Stem Player" is a handheld device that allows users to control vocals, drums, bass and add effects, allowing for unique customizations of any song. Ours is **innovative**, because it combines the strengths of all these inspirations and combines these into one, most importantly, **creating a hub for music creators to collaborate more easily than ever before**.

Our project will have a few primary functions, all centered around sharing and matching music creators. First, is simply a feed allowing musicians to share instrumentals. They can post their instrumental and see what friends/peers have to say about it. Each posting will have likes and a section for commenting text comments or song replies, ultimately cultivating a Social Media esque experience built specifically for music creators!

## **Team Members:**

- Ashir Imran ([@ashir-imran](https://github.com/ashir-imran))
- Joseph Pterillo ([@joepetrillo](https://github.com/joepetrillo))
- Alex Bowman ([@bowmana](https://github.com/bowmana))
- Jack Bisceglia ([@jackbisceglia](https://github.com/jackbisceglia))

## **User Interface:**

### **Login/Signup**

The Login and Signup pages are separate UI Views. They both provide the primary entry points into our application.

Signup is a simple HTML Form with Email, Username, Password, and Confirm Password fields. It posts to our API and invokes the instantiation of a User object in our Database.

Login is also a simple HTML form, and is what handles the bulk of the Authentication logic in our application. Upon successful credential submission, our login form authenticates the User session and redirects them to the feed page, to begin interacting with our application.

| Login                                                                                            | Signup                                                                                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| ![Login](https://cdn.discordapp.com/attachments/941059461764751420/972642392467472384/login.png) | ![Signup](https://cdn.discordapp.com/attachments/941059461764751420/972642392467472384/login.png) |

### **Feed**

The feed page is the primary interface in our application. This is where site wide data is loaded in; this is done in standard social media feed fashion, à la Twitter or Reddit.

We provide filters for 'Top' and 'Latest', allowing the user to browse posts with respect to popularity and recency; this is calculated by Like Count and Creation Date respectively.

Posts are then displayed in a vertical feed, with comments displayed underneath each posts.

![Feed](https://cdn.discordapp.com/attachments/941059461764751420/972642392928825414/feed.png)

### **Account**

The account page is private to each user, and is our dashboard allowing the user to update account info. We allow the change of Profile Picture, Email, and Password fields.

![Account](https://cdn.discordapp.com/attachments/941059461764751420/972642392681365535/editprofile.png)

### **Profile**

The profile page is both private and public. In either instance, the user is met with various data specific to the profile they are visiting. We display Beats, Songs, and Comments each in their own tab. Each of which has filter options for "Top" and "Latest" which behave identically to the filters that belong on the feed page.

When a user visits their own profile, the main difference is that they see the ability to delete their own content (Beats, Songs, and Comments). This functionality is site-wide as well, though this page provides the easiest interface for a user to delete their own content.

| Profile 1                                                                                              | Profile 2                                                                                              |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| ![Profile1](https://cdn.discordapp.com/attachments/941059461764751420/972642392018653194/profile1.png) | ![Profile2](https://cdn.discordapp.com/attachments/941059461764751420/972642391800573952/profile2.png) |

### **Beat**

The Beat Page is the primary thread on the Lone Music application. For any Beat that is posted to our application, a corresponding Beat page is available. This is a dedicated page for a post.

This page exposes utilities for listening the the beat, commenting on it, or replying with a song. Furthermore, it displays all comments and song replies in thread form for easy browsing of discourse surrounding the content. We again provide "Top" and "Latest" filters here.

![Beat](https://cdn.discordapp.com/attachments/941059461764751420/972642393667043368/beat.png)

### **Song**

The Song page is largely identical to the Beat Page, and at a logic level, provides a lot of the same functionality as the Beat Page. This is another thread-style UI View, which is specific to a Song reply, rather than a Beat post.

The primary differences are that: there is no Song reply form (we don't allow songs as replies to songs), and there is a link back to the Beat that the Song is replying to.

![Song](https://cdn.discordapp.com/attachments/941059461764751420/972642393436323860/song.png)

### **Upload**

The Upload page is our Beat Submission Form. It takes in Title, Genre, and Beat URL as fields, and posts the information to the server where it is subsequently added to the Database.

![Upload](https://cdn.discordapp.com/attachments/941059461764751420/972642393197273158/upload.png)

## **APIs:**

## [Users](https://documenter.getpostman.com/view/19056541/UVyvvEdX)

Use these API calls to create, read, update and delete users.

### POST: create user

#### /users

Create a new user. In the request body, include the email, username, password and confirmed password.

#### Body (JSON):

```
 {
  "email": "userEmail@gmail.com",
  "username": "username",
  "password": "pass1234",
  "confirm": "pass1234"
  }
```

Returns the newly created user object.

---

### GET: read user

#### /users/{userid}

Get the user matching the given user id in the url parameter.
Returns the matching user object.

---

### PUT: update user

#### /users/{userid}

Update the email, password or profile picture of the user matching the given user id in the url parameter. In the request body, include the type of update that is being performed, email, password, confirmed password and the profile picture url. Type can be of "email", "password" or "picture". If certain fields are not being used, set them to null.

#### Body (JSON):

```{
  "type": "email/password",
  "email": "123@gmail.com",
  "password": "password",
  "confirm": "password",
  "picture": "url of profile picture"
  }
```

Returns a success/failure message regarding the update.

---

### DEL: delete user

#### /users/{userId}

Delete the user matching the given user id in the url parameter.
Returns a success/failure message regarding the deletion.

---

## [Posts](https://documenter.getpostman.com/view/19056541/UVyvvEdW)

Use these API calls to create, read, update and delete posts.

### POST: create post

#### /posts

Create a new post. In the request body, include the id of the user, title, genre and the url of the associated audio file. Also include the id of the instrumental parent post if this is a vocal response. If this is an instrumental, set the parent id to null.

### BODY :

```{
 "userId": 123,
 "title": "post title",
 "genre": "post genre",
 "audio": "url of audio file",
 "parentId": 123
 }
```

Returns the newly created post object.

---

### GET: read feed posts

#### /posts?sort={sortType}

Get all posts using the filter passed as a query parameter. The sort query parameter can be of type "top" or "latest".

| Query Params : |                   |
| -------------- | :---------------: |
| sort           | "top" or "latest" |

Returns a JSON array of all the matching posts.

---

### GET: read specific post

#### /posts/{postid}

Get the post matching the given post id in the url parameter. Returns the specified post object in JSON.

---

### GET: read user posts

#### /users/{userid}/posts

Get all posts made by the given user id in the url parameter matching the sort and filter options in the query parameters. If "filter" is not given, then all posts belonging to the user will be returned.

| Query Params : |                    |
| -------------- | :----------------: |
| sort           | "top" or "latest"  |
| filter         | "beats" or "songs" |

Returns a JSON array of all the matching posts.

---

### PUT: update post

#### /posts/{postid}

Update the like count of the post matching the given post id in the url paremeter. In the request body, include the id of the user that is liking or disliking the post.

#### Body (JSON) :

```
{
    "userId": 123
}
```

Returns a success/failure message regarding the update.

---

### DEL: delete post

#### /posts/{postid}

Delete the post matching the given post id in the url parameter.
Returns a success/failure message regarding the deletion.

---

## [Comments](https://documenter.getpostman.com/view/19056541/UVyvvEUi)

Use these API calls to create, read, update and delete comments.

### POST: create comment

#### /posts/{postId}/comments

Create a new comment. In the request body, include the id of the user making the comment, the id of the post being commented on, and the comment itself.

#### Body (JSON) :

```
{
    "userId": 123,
    "postId": 123,
    "comment": "This is a comment"
}
```

Returns the created comment object in JSON.

---

### GET: read post comments

#### /posts/{postId}/comments?sort={sortType}&filter={filterType}

Get all the replies to a post given the post id in the url parameter, as well as sorting and filtering query parameters. If filter is not specified, all replies, including both songs and comments, will be returned.

| Query Params : |                       |
| -------------- | :-------------------: |
| sort           |   "top" or "latest"   |
| filter         | "songs" or "comments" |

Returns a JSON array of replies matching the request.

---

### GET: read user comments

#### /users/{userid}/comments?sort={sortType}

Get all the comments a user has made given the user id in the url parameter, as well as sorting them.

| Query Params : |                   |
| -------------- | :---------------: |
| sort           | "top" or "latest" |

Returns a sorted JSON array of comments matching the request.

---

### PUT: update comment

#### /posts/{postId}/comments/{commentId}

Update the like count of the comment matching the given comment id in the url paremeter. In the request body, include the id of the user that is liking or disliking the comment.

#### Body (JSON) :

```
{
    "userId": 123
}
```

Returns a success/failure message regarding the update.

---

### DEL: delete comment

#### /posts/{postId}/comments/{commentId}

Delete the comment on a post given the post id and comment id in the url parameter.
Returns a success/failure message regarding the deletion.

## **Database:**

We used a MongoDB database to persist our data from the server. We utilized Atlas, and the MongoDB Node driver to do so. Our entities are as follows:

**Data Entity:** Post (As stored in Mongo)

```
{
   "_id":{
      "$oid": Mongo Generated ID
   },
   "postId": ID Generated on Server Side,
   "userId": ID Generated on Server Side,
   "title": Title Provided by User,
   "genre": Genre Provided by User,
   "audio": Audio URL Provided by User,
   "parentId": ID Generated on Server Side,
   "likeCount":{
      "$numberInt": Number of Likes
   },
   "likedBy":[ Array of those who've liked this post],
   "created":{
      "$date":{
         "$numberLong": Date of Post Creation
      }
   }

```

**Data Entity:** User (As stored in Mongo)

```
{
   "_id":{
      Mongo Generated ID
   },
   "userId": ID Generated on Server Side,
   "email": User Email Address,
   "username": User's Username,
   "password":" User's Password,
   "picture": User's Profile Picture
}

```

**Data Entity:** Comment (As stored in Mongo)

```
{
   "_id":{
      "$oid": Mongo Generated ID
   },
   "commentId": ID Generated on Server Side,
   "userId": ID Generated on Server Side,
   "postId": ID Generated on Server Side,
   "comment": Comment String Provided By User,
   "likeCount":{
      "$numberInt": Number of Likes
   },
   "likedBy":[ Array of those who've liked this post],
   "created":{
      "$date":{
         "$numberLong": Date of Post Creation
      }
   }
}


```

## **URL Routes/Mappings:**

All Website routes begin with: https://lonemusic.herokuapp.com

| Route             | Corresponding User Interface Page                  |
| ----------------- | -------------------------------------------------- |
| /                 | Feed Page                                          |
| /login            | Login Page                                         |
| /signup           | Signup Page                                        |
| /beat/{beatId}    | Beat Page: specific to the beatId in the URL       |
| /song/{songId}    | Song Page: specific to the songId in the URL       |
| /upload           | Upload page: allows the user to upload a beat      |
| /profile/{userId} | Profile page: specific to the profileId in the URL |
| /account          | Account page: specific to the profileId in the URL |

## **Authentication/Authorization:**

On LoneMusic, we use the passport.js library to handle logging in and authenticating users. Logging in is done through a user's email and password, which is used on the backend to log the user in and store their information in a session cookie that passport and express take care of. This, combined with some middleware, allows us to make the entire site private to only logged in users. If someone tries to access any page without being authenticated, they will be redirected to the login page where they must log in to go through the auth process or create an account.

## **Division of Labor:**

### **Ashir Imran:**

_Milestone 1:_

- Helped on MongoDB setup
- HTML For: Beat page, Song page, Upload page
- Digitized hand-drawn wireframes
- Screenshotted HTML and wrote descriptions
- Wireframe Drawings and Feed Page HTML

_Milestone 2:_

- JS For: Song page, Beat page, Feed page, Profile Page
- API Routes, API Design

Worked largely together on the API, initial implentation of API, and Feed Page of the website

_Milestone 3:_

- Refactored entirety of Frontend code into more organized and reusable code
  - Found in CrudUtils.js in /client
- Wrote Authentication logic
- Helped with Post and User route cleanup/refactors
- Helped with PostUtils refactoring for interaction with MongoDB
- Refactors UserUtils for interaction with MongoDB

### **Joseph Petrillo:**

_Milestone 1:_

- Led MongoDB setup, with the use of Atlas and MongoDB node package
- HTML For: Login page, Sign Up page, Profile page, Account Page
- Validated HTML
- CSS Revisions/Cleanup
- Develop Data interactions
- Wireframe Drawings and Feed Page HTML

_Milestone 2:_

- JS For: Account Page, Feed Page,
- Styling
- Navigation
- API Routes, API Design

Worked largely together on the API, initial implentation of API, and Feed Page of the website

_Milestone 3:_

- Refactored User Routes
- Refactored UserUtils to interact with MongoDB, rather than local persistence
- Helped Refactor Post Routes and PostUtils to work with Mongo
- Gathered Screenshots for each UI View

### **Alex Bowman:**

_Milestone 1:_

- HTML For: Beat page, Song page, Upload page
- Uploaded Wireframes
- Wireframe Drawings and Feed Page HTML

_Milestone 2:_

- JS For: Feed page, Profile page, Beat page
- API Routes, API Design

Worked largely together on the API, initial implentation of API, and Feed Page of the website

_Milestone 3:_

- Helped on MongoDB Setup
- Helped Refactor User Routes and UserUtils to work with Mongo
- Also helped Refactor Post Routes and PostUtils to work with Mongo
- Clean up Project code for unnecessary/extranneous code
- Wrote up Final Video Overview/Script

### **Jack Bisceglia:**

_Milestone 1:_

- HTML For: Login page, Sign Up page, Profile page, Account Page
- Linked pages together
- CSS Revisions/Cleanup
- Wireframe Drawings and Feed Page HTML

_Milestone 2:_

- JS For: Upload page, Signup page, Feed page
- API Routes, API Design

Worked largely together on the API, initial implentation of API, and Feed Page of the website

_Milestone 3:_

- Helped on MongoDB setup
- Refactored Post Routes
- Refactored PostUtils to interact with MongoDB, rather than local persistence
- Helped Refactor User Routes and UserUtils to work with Mongo
- Wrote up Final.md markdown submission

## **Conclusion:**

We found the process and completion of this project largely enjoyable and educational at every step. With regards to the design and implementation process, we worked very hard at making the design, and design implementation something we were proud of. As a result, each milestone featured a slightly different outcome for what the site looked like. We found the CSS itself to be a challenge, and although the help of Bootstrap was a time-saver, we found ourselves battling with it at times as well. Difficulties we faced included overscoping, where we overestimated the time/resources we had at our disposal for certain features/ideas. At times we had to roll back our vision of certain features due to the limitation of time or resources. We found Authentication fairly tricky to implement, especially as a last step task, since so much of our application had already been architected. Rather than build the authentication system exactly how we might have wanted to, we had to alter it to fit our current logic flow, since refactoring the application logic during Milestone 3 would have been far too time consuming and a massive setback. As a result, we think that authentication related knowledge is really the primary thing we would have benefited from knowing about earlier on in the project timeline. In addition, at least having an elementary conceptual understanding of Databases and the logic surrounding them would have been helpful when trying to decide how to design our API.

All in all, we had a good time building the application, and we are proud of what we were able to develop.

## **Rubric:**
- Authenticated Login - 15%
- Create Account - 10%
- Make Post - 15%
- Like Post - 5%
- Like Comment - 5%
- Comment on Post - 10%
- Reply to Post with Song - 15%
- Update Profile - 10%
- Deleting Content - 5%
- Heroku Deployment - 5%
- Video - 5% 
