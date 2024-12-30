import { Client, Databases } from "node-appwrite";
import dotenv from "dotenv";

import type { Model } from "./model";

dotenv.config();

export class dbwrite {
  private static databases: Databases;
  private static models: Record<string, Model> = {};

  static connect(endpoint: string, projectId: string, apiKey: string) {
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);

    this.databases = new Databases(client);
  }

  private static async createDatabase(
    databaseId: string,
    databaseName: string,
    model: Model
  ): Promise<void> {
    if (!this.databases) {
      throw new Error(
        `Dbwrite: Please call connect() first before calling createDateabse.`
      );
    }

    if (!this.models[databaseId]) {
      this.models[databaseId] = model;

      try {
        await this.databases.create(databaseId, databaseName);
      } catch (error) {
        throw new Error(`Dbwrite: Error creating an database: ${error}`);
      }
    }
  }
}
