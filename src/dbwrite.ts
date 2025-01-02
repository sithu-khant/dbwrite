import { Client, Databases, type Models } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

export class dbwrite {
  protected static databases: Databases;
  protected static client: Client;

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

  static async listDatabases(
    queries: [] = [],
    search: string = "<SEARCH>"
  ): Promise<Models.DatabaseList> {
    dbwrite.checkConnection("listDatabases()");

    const databases = await this.databases.list(queries, search);

    return databases;
  }

  static async createDatabase(
    databaseName: string,
    databaseId: string
  ): Promise<any> {
    dbwrite.checkConnection("createDatabase()");

    const isAlreadyExist = await this.databases.get(databaseId);
    if (!isAlreadyExist) {
      try {
        await this.databases.create(databaseId, databaseName);
      } catch (error) {
        throw new Error(`Dbwrite: Error creating an database: ${error}`);
      }
    }
  }

  static async getDatabase(databaseId: string): Promise<Models.Database> {
    dbwrite.checkConnection("getDatabase()");

    const result = await this.databases.get(databaseId);

    return result;
  }

  static async updateDatabase(
    databaseId: string,
    databaseName: string,
    enabled = false
  ): Promise<Models.Database> {
    dbwrite.checkConnection("updateDatabase()");

    const result = await this.databases.update(
      databaseId,
      databaseName,
      enabled
    );

    return result;
  }

  static async deleteDatabase(databaseId: string): Promise<{}> {
    dbwrite.checkConnection("updateDatabase()");

    const result = await this.databases.delete(databaseId);

    return result;
  }
}
