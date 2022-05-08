# CS326 BullyMaguire Team Submission

## **Title:** Team Bully Maguire

## **Subtitle:** Lone Music

## **Semester:** Spring 2022 Semester

## **Overview:**

- Idea
- Importance
- Implementation
- Technologies

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

### **Joseph Pterillo:**

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
