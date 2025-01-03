import { Database } from "../src/database";
import { dbwrite } from "../src/dbwrite";
import { Model } from "../src/model";
import { Schema } from "../src/schema";

const schema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    provider: { type: String, required: true },
    type: { type: String, required: true },
    billingCycle: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    autoRenew: { type: Boolean, required: true },
    plan: { type: String, required: true },
    cost: { type: Number, required: true },
    currency: { type: String, required: true },
    website: { type: String, required: true },
    notes: { type: String, required: false },
  },
  { _deletedAt: true }
);

dbwrite.connect(
  process.env.APPWRITE_ENDPOINT!,
  process.env.APPWRITE_PROJECT!,
  process.env.APPWRITE_KEY!
);

const SubscriptionDB = new Database(
  process.env.DATABASE_ID!,
  process.env.DATABASE_NAME!
);

const SubscriptionModel = new Model(
  SubscriptionDB,
  process.env.COLLECTION_ID!,
  process.env.COLLECTION_NAME!,
  schema
);

SubscriptionDB.listCollections();
