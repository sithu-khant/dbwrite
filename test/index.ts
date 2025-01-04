import { RelationMutate, RelationshipType } from "node-appwrite";
import { Database } from "../src/database";
import { dbwrite } from "../src/dbwrite";
import { Model } from "../src/model";
import { Schema } from "../src/schema";

const schema = new Schema({
  name: {
    type: "String",
    required: true,
    max: 100,
  },
  age: {
    type: "Integer",
    required: true,
    min: 18,
    max: 100,
  },
  email: {
    type: "Email",
    enum: ["email"],
    required: true,
  },
  isActive: {
    type: "Boolean",
    required: true,
    default: true,
  },
  createdAt: {
    type: "Datetime",
    required: true,
  },
  status: {
    type: "Enum",
    enum: ["active", "inactive", "suspended"],
    required: true,
    default: "active",
  },
  tags: {
    type: "String",
    required: true,
    array: true,
    min: 1,
    max: 5,
  },
  // relatedUser: {
  //   type: "Relationship",
  //   relation: {
  //     relatedCollectionId: "users", // Related collection ID
  //     field: "user_id", // Related field in the "users" collection
  //     type: "OneToOne", // Relationship type
  //     twoWay: true, // Two-way relationship
  //     twoWayKey: "related_user_id", // Key for two-way relationship
  //     onDelete: "SetNull", // onDelete behavior
  //   },
  // },
});

dbwrite.connect(
  process.env.APPWRITE_ENDPOINT!,
  process.env.APPWRITE_PROJECT!,
  process.env.APPWRITE_KEY!
);

const TestDB = new Database(
  process.env.DATABASE_ID!,
  process.env.DATABASE_NAME!
);

const TestModel = new Model(
  TestDB,
  process.env.COLLECTION_ID!,
  process.env.COLLECTION_NAME!,
  schema
);

// console.log(await TestModel.listDocuments());

// console.log(await dbwrite.getDatabase(process.env.DATABASE_ID!));

// console.log(await dbwrite.getDatabase(process.env.DATABASE_ID!));
// await dbwrite.deleteDatabase(process.env.DATABASE_ID!);
