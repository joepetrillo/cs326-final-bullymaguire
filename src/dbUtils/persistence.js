let users = [
  {
    userId: "1000",
    email: "ashir@gmail.com",
    username: "ashir",
    password: "password",
    picture: "https://www.pngkey.com/png/full/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png",
  },
  {
    userId: "1001",
    email: "jack@gmail.com",
    username: "jack",
    password: "password",
    picture: "https://www.pngkey.com/png/full/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png",
  },
  {
    userId: "1002",
    email: "joe@gmail.com",
    username: "jack",
    password: "password",
    picture: "https://www.pngkey.com/png/full/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png",
  },
  {
    userId: "1003",
    email: "alex@gmail.com",
    username: "alex",
    password: "password",
    picture: "https://www.pngkey.com/png/full/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png",
  },
];

let comments = [
  {
    commentId: "commentId",
    userId: "1001",
    postId: "2000",
    comment: "this is a comment by user 999",
    likeCount: 9,
    likedBy: ["userId", "userId", "userId"],
    created: new Date("2022-04-14T09:48:55.064Z"),
  },
  {
    commentId: "commentId",
    userId: "1001",
    postId: "2000",
    comment: "this is another comment by user 999",
    likeCount: 1,
    likedBy: ["userId", "userId", "userId"],
    created: new Date("2022-04-13T10:48:55.064Z"),
  },
  {
    commentId: "1234",
    userId: "1000",
    postId: "2000",
    comment: "this is a comment by user 1000",
    likeCount: 3,
    likedBy: ["1000", "1001", "1002"],
    created: new Date("2022-04-14T14:48:55.064Z"),
  },
];

let posts = [
  {
    postId: "2000",
    userId: "1000",
    title: "post title",
    genre: "post genre",
    audio: "url of audio file",
    parentId: "2000",
    likeCount: 9,
    likedBy: ["1001"],
    created: new Date("2022-04-13T08:48:55.064Z"),
  },
  {
    postId: "2001",
    userId: "1001",
    title: "post title 1",
    genre: "post genre",
    audio: "url of audio file",
    parentId: "2000",
    likeCount: 3,
    likedBy: ["1000", "1001", "1002"],
    created: new Date("2022-04-14T18:48:55.064Z"),
  },
  {
    postId: "2002",
    userId: "1001",
    title: "post title 2",
    genre: "post genre",
    audio: "url of audio file",
    parentId: null,
    likeCount: 2,
    likedBy: ["1000", "1002"],
    created: new Date("2022-04-14T10:48:55.064Z"),
  },
];

export { users, comments, posts };
