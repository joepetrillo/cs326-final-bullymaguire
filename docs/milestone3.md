## **Documentation:**

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

## **Division of Labor:**

### **Ashir Imran:**

- Refactored entirety of Frontend code into more organized and reusable code
  - Found in CrudUtils.js in /client
- Wrote Authentication logic
- Helped with Post and User route cleanup/refactors
- Helped with PostUtils refactoring for interaction with MongoDB
- Refactors UserUtils for interaction with MongoDB

### **Joseph Petrillo:**

- Led MongoDB setup, with the use of Atlas and MongoDB node package
- Refactored User Routes
- Refactored UserUtils to interact with MongoDB, rather than local persistence
- Helped Refactor Post Routes and PostUtils to work with Mongo
- Gathered Screenshots for each UI View

### **Alex Bowman:**

- Helped on MongoDB Setup
- Helped Refactor User Routes and UserUtils to work with Mongo
- Also helped Refactor Post Routes and PostUtils to work with Mongo
- Clean up Project code for unnecessary/extranneous code
- Wrote up Final Video Overview/Script

### **Jack Bisceglia:**

- Helped on MongoDB setup
- Refactored Post Routes
- Refactored PostUtils to interact with MongoDB, rather than local persistence
- Helped Refactor User Routes and UserUtils to work with Mongo
- Wrote up Final.md markdown submission

In actuality we all worked together on a lot of this, but this is the closest to an actual split of work that we could come up with
