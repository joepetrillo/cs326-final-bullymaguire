import "dotenv/config";
import { MongoClient } from "mongodb";

async function connection() {
  const client = new MongoClient(process.env.DATABASE_URL);

  async function connect() {
    await client.connect();
    return client.db("lonemusic");
  }

  async function close() {
    client.close();
  }

  return { connect, close };
}

export { connection };
