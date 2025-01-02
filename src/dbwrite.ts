import { Client, Databases, type Models } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

export class dbwrite {
  private static databases: Databases;
  private static client: Client;
  private static databaseList: Record<string, string> = {};

  static connect(endpoint: string, projectId: string, apiKey: string): void {
    this.client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);

    this.databases = new Databases(this.client);
  }

  protected static checkConnection(methodName: string): void {
    if (!this.databases) {
      throw new Error(
        `Dbwrite: Please call "dbwrite.connect()" before calling ${methodName}.`
      );
    }
  }

  protected static getClient(): Client {
    this.checkConnection("getClient");
    return this.client;
  }

  protected static getDatabases(): Databases {
    this.checkConnection("getDatabases");
    return new Databases(this.getClient());
  }

  static async listDatabases(
    queries: string[] = [],
    search = ""
  ): Promise<Models.DatabaseList> {
    this.checkConnection("listDatabases");
    return search !== ""
      ? this.databases.list(queries, search)
      : this.databases.list(queries);
  }

  static async createDatabase(
    databaseId: string,
    databaseName: string,
    enabled = false
  ): Promise<void> {
    this.checkConnection("createDatabase");

    const existingDatabase = await this.getDatabase(databaseId);
    if (existingDatabase) {
      return;
    }

    try {
      await this.databases.create(databaseId, databaseName, enabled);
      this.databaseList[databaseId] = databaseName;
    } catch (error) {
      throw new Error(`Dbwrite: Error creating database: ${error}`);
    }
  }

  static async getDatabase(
    databaseId: string
  ): Promise<Models.Database | null> {
    this.checkConnection("getDatabase");

    try {
      return await this.databases.get(databaseId);
    } catch {
      return null;
    }
  }

  static async updateDatabase(
    databaseId: string,
    databaseName: string,
    enabled = false
  ): Promise<Models.Database> {
    this.checkConnection("updateDatabase");
    return this.databases.update(databaseId, databaseName, enabled);
  }

  static async deleteDatabase(databaseId: string): Promise<void> {
    this.checkConnection("deleteDatabase");
    await this.databases.delete(databaseId);
  }
}
