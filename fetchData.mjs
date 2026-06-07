import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const uri = '';
const options = {};
// async function fetchData() {
//   const client = new MongoClient(uri, options);
//   await client.connect();
//   const db = client.db('becudaBuea');
//   const users = await db.collection('users').find({}).toArray();
//   console.log("Fetched users:", users);
//   await client.close();
// }

//fetchData().catch(console.error);

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


async function insertData() {
  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    const db = client.db('becudaBuea');
    const collection = db.collection('users');
    const hashedPassword = await hashPassword("676308067");
    const users = [
      {
        firstName: "musong",
        lastName: "Ernest",
        position: "Member",
        phone: 676308067,
        role: "admin",
        password: hashedPassword,
        reg: 1000,
        registeredOn: "Sun 4th Nov, 2023",
        transactions: []
      }
    ];

    const result = await collection.insertMany(users);
    console.log(`Inserted ${result.insertedCount} documents`);
  } finally {
    await client.close();
  }
}

insertData().catch(console.error);

// run: node fetchData.mjs
