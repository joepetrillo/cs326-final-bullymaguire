let users = [
  {
    userId: "1000",
    email: "ashir@gmail.com",
    username: "ashir",
    password: "password",
    picture: "https://celticswire.usatoday.com/wp-content/uploads/sites/39/2022/01/USATSI_17463663.jpg?w=1000&h=600&crop=1",
  },
  {
    userId: "1001",
    email: "jack@gmail.com",
    username: "jack",
    password: "password",
    picture: "https://celticswire.usatoday.com/wp-content/uploads/sites/39/2022/01/USATSI_17463663.jpg?w=1000&h=600&crop=1",
  },
  {
    userId: "1002",
    email: "joe@gmail.com",
    username: "jack",
    password: "password",
    picture: "https://celticswire.usatoday.com/wp-content/uploads/sites/39/2022/01/USATSI_17463663.jpg?w=1000&h=600&crop=1g",
  },
  {
    userId: "1003",
    email: "alex@gmail.com",
    username: "alex",
    password: "password",
    picture: "https://celticswire.usatoday.com/wp-content/uploads/sites/39/2022/01/USATSI_17463663.jpg?w=1000&h=600&crop=1g",
  },
];

let comments = [
  {
    commentId: "1235",
    userId: "1001",
    postId: "2000",
    comment: "this is a comment by user @jack this is a comment by user @jack this is a comment by user @jack",
    likeCount: 91,
    likedBy: ["userId", "userId", "userId"],
    created: new Date("2022-04-14T09:48:55.064Z"),
  },
  {
    commentId: "commentId",
    userId: "1001",
    postId: "2000",
    comment: "this is another comment by user @jack",
    likeCount: 11,
    likedBy: ["userId", "userId", "userId"],
    created: new Date("2022-04-15T10:48:55.064Z"),
  },
  {
    commentId: "1234",
    userId: "1000",
    postId: "2000",
    comment: "this is a comment by user @ashir",
    likeCount: 3,
    likedBy: ["1000", "1001", "1002"],
    created: new Date("2022-04-14T14:48:55.064Z"),
  },
  {
    commentId: "1234",
    userId: "1000",
    postId: "2002",
    comment: "this is a comment by user @ashir",
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
    genre: "Hip-Hop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    parentId: null,
    likeCount: 9,
    likedBy: ["1001"],
    created: new Date("2022-04-13T08:48:55.064Z"),
  },
  {
    postId: "2001",
    userId: "1001",
    title: "post title 1",
    genre: "Rock",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    parentId: null,
    likeCount: 3,
    likedBy: ["1000", "1001", "1002"],
    created: new Date("2022-04-14T18:48:55.064Z"),
  },
  {
    postId: "2002",
    userId: "1001",
    title: "post title 2",
    genre: "Hip-Hop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    parentId: "2000",
    likeCount: 2,
    likedBy: ["1000", "1002"],
    created: new Date("2022-04-14T19:48:55.064Z"),
  },
];

export { users, comments, posts };
