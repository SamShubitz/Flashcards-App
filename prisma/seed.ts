const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function seed() {
  const user = await db.user.create({
    data: {
      username: "John Doe",
    },
  });

  await db.deck.create({
    data: {
      name: "mydeck",
      cards: {
        create: [
          { front: "blah", back: "glargh" },
          { front: "blargh?", back: "glargh!" },
        ],
      },
      userId: user.id,
    },
  });

  console.log("User and deck inserted successfully");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
