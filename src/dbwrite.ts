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

  static checkConnection(func: string): void {
    if (!this.databases) {
      throw new Error(
        `Dbwrite: Please call "dbwrite.connect()" first before calling ${func}.`
      );
    }
  }

  private static async createDatabase(
    databaseId: string,
    databaseName: string,
    model: Model
  ): Promise<void> {
    dbwrite.checkConnection("createDatabase()");

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
