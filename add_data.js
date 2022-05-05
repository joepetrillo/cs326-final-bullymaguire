import { connection } from "./src/dbUtils/connection.js";
const { connect, close } = await connection();
let users = [
  {
    userId: "1000",
    email: "ashir@gmail.com",
    username: "ashir",
    password: "password",
    picture: "https://pbs.twimg.com/profile_images/1292283400322191361/Pq5hR39I_400x400.jpg",
  },
  {
    userId: "1001",
    email: "jack@gmail.com",
    username: "jack",
    password: "password",
    picture: "https://img-cdn.inc.com/image/upload/w_1920,h_1080,c_fill/images/panoramic/GaryVaynerchuk_Shot_A_0182-crop_487627_zpmtsy.jpg",
  },
  {
    userId: "1002",
    email: "joe@gmail.com",
    username: "joe",
    password: "password",
    picture: "https://www.askideas.com/media/35/Animal-Makes-Funny-Face.jpg",
  },
  {
    userId: "1003",
    email: "alex@gmail.com",
    username: "alex",
    password: "password",
    picture: "https://cdn.discordapp.com/attachments/941059461764751420/966542121668608070/unknown.png",
  },
];

let comments = [
  {
    commentId: "1235",
    userId: "1001",
    postId: "2000",
    comment: "Really like this!",
    likeCount: 3,
    likedBy: ["userId", "userId", "userId"],
    created: new Date("2022-04-14T09:48:55.064Z"),
  },
  {
    commentId: "1236",
    userId: "1001",
    postId: "2000",
    comment: "Great job! Loved the drums in this one",
    likeCount: 3,
    likedBy: ["userId", "userId", "userId"],
    created: new Date("2022-04-15T10:48:55.064Z"),
  },
  {
    commentId: "1237",
    userId: "1000",
    postId: "2000",
    comment: "I'm going to rap over this!",
    likeCount: 2,
    likedBy: ["1000", "1002"],
    created: new Date("2022-04-14T14:48:55.064Z"),
  },
  {
    commentId: "1238",
    userId: "1000",
    postId: "2002",
    comment: "Lame!",
    likeCount: 3,
    likedBy: ["1000", "1001", "1002"],
    created: new Date("2022-04-14T14:48:55.064Z"),
  },
  {
    commentId: "1239",
    userId: "1001",
    postId: "2002",
    comment: "Could have been better tbh.",
    likeCount: 3,
    likedBy: ["1000", "1001", "1002"],
    created: new Date("2022-04-14T14:48:55.064Z"),
  },
];

let posts = [
  {
    postId: "2000",
    userId: "1000",
    title: "Futuristic Type Beat",
    genre: "Hip-Hop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    parentId: null,
    likeCount: 1,
    likedBy: ["1001"],
    created: new Date("2022-04-13T08:48:55.064Z"),
  },
  {
    postId: "2001",
    userId: "1001",
    title: "Dark Future",
    genre: "Pop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    parentId: null,
    likeCount: 1,
    likedBy: ["1002"],
    created: new Date("2022-04-14T18:48:55.064Z"),
  },
  {
    postId: "2002",
    userId: "1001",
    title: "My New Beat",
    genre: "Hip-Hop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    parentId: "2000",
    likeCount: 2,
    likedBy: ["1000", "1002"],
    created: new Date("2022-04-14T19:48:55.064Z"),
  },
];

const DB = await connect();
const USERS = DB.collection("users");
const COMMENTS = DB.collection("comments");
const POSTS = DB.collection("posts");

USERS.insertMany(users);
COMMENTS.insertMany(comments);
POSTS.insertMany(posts);
