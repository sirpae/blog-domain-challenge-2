const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createUser = await prisma.user.create({
      data: {
        username: "pineappleLuver",
        email: "paepineapple@hotmail.com",
        password: "PinePae1",
      },
    });
    
const createPost = await prisma.post.create({
    data: {
        title: "Pineapples or Watermelons?",
        content: "Spent $400 on pineapples...",
        imageUrl: "http://www.pineapple.com",
        userId: createUser.id,
        },
    });

const createCategory = await prisma.category.create({
    data: {
      name: "Pineapples!",
      posts: {
        create: [
          {
            title: "Best ways to eat a pineapple...",
            content: "Grab a fork, and lets begin!",
            imageUrl: "https://www.pineapple.com",
            publishedTime: "September 1, 2022 9:30:45",
            userId: createUser.id,
          }
        ],
      },
    },
    include: {
      posts: true,
    },
  });

const createComment = await prisma.comment.create({
    data: {
        comment: "Wow, awesome... Pineapples were my grandfathers favourite!",
        userId: createUser.id,
        postId: createPost.id,
        },
    });

    console.log("Created Customer", createUser);
    console.log("Created Post", createPost);
    console.log("Post Uploaded", createCategory);
    console.log("Created Comment", createComment);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


