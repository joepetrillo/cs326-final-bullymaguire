let users = [
  {
    id: "1000",
    email: "ashir@gmail.com",
    username: "ashir",
    password: "password",
    picture: "default profile picture url",
  },
  {
    id: "1001",
    email: "jack@gmail.com",
    username: "jack",
    password: "password",
    picture: "default profile picture url",
  },
  {
    id: "1002",
    email: "joe@gmail.com",
    username: "jack",
    password: "password",
    picture: "default profile picture url",
  },
  {
    id: "1003",
    email: "alex@gmail.com",
    username: "alex",
    password: "password",
    picture: "default profile picture url",
  },
];

let comments = [
  {
    commentId: "commentId",
    userId: "999",
    postId: "postId",
    comment: "this is a comment by user 999",
    likeCount: "likeCount",
    likedBy: ["userId", "userId", "userId"],
  },
  {
    commentId: "commentId",
    userId: "999",
    postId: "postId",
    comment: "this is another comment by user 999",
    likeCount: "likeCount",
    likedBy: ["userId", "userId", "userId"],
  },
  {
    commentId: "commentId",
    userId: "1000",
    postId: "postId",
    comment: "this is a comment by user 1000",
    likeCount: "likeCount",
    likedBy: ["userId", "userId", "userId"],
  },
];

let posts = [
  {
    userId: "1000",
    title: "post title",
    genre: "post genre",
    audio: "url of audio file",
    parentId: "123",
  },
  {
    userId: "1001",
    title: "post title",
    genre: "post genre",
    audio: "url of audio file",
    parentId: "123",
  },
  {
    userId: "1001",
    title: "post title",
    genre: "post genre",
    audio: "url of audio file",
    parentId: "123",
  },
];

export { users, comments, posts };
