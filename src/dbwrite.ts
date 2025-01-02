import { Client, Databases } from "node-appwrite";
import dotenv from "dotenv";

import type { Model } from "./model";

dotenv.config();

export class dbwrite {
  private static databases: Databases;
  private static client: Client;
  private static databaseList: Record<string, string> = {};

  static connect(endpoint: string, projectId: string, apiKey: string) {
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);

    this.databases = new Databases(client);
    this.client = client;
  }

  static checkConnection(func: string): void {
    if (!this.databases) {
      throw new Error(
        `Dbwrite: Please call "dbwrite.connect()" first before calling ${func}.`
      );
    }
  }

  static getClient(): Client {
    dbwrite.checkConnection("getClient()");

    return this.client;
  }

  static getDatabases(): Databases {
    dbwrite.checkConnection("getDatabases()");

    return new Databases(this.getClient());
  }

  static get listDatabases() {
    return dbwrite.databaseList;
  }

  static async createDatabase(
    databaseId: string,
    databaseName: string
  ): Promise<any> {
    dbwrite.checkConnection("createDatabase()");

    if (!this.databaseList[databaseId]) {
      this.databaseList[databaseId] = databaseName;

      try {
        await this.databases.create(databaseId, databaseName);
      } catch (error) {
        throw new Error(`Dbwrite: Error creating an database: ${error}`);
      }
    }

    return;
  }
}
