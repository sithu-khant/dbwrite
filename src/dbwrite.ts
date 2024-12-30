import type { Client } from "node-appwrite";
import dotenv from "dotenv";

import { Model } from "./model";

dotenv.config();

export class dbwrite {
  private static client: Client;
  private static models: Record<string, Model>;
}
