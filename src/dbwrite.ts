import { Client, Databases, type Models } from "node-appwrite";

export class dbwrite {
  private static databases: Databases;
  private static client: Client;

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

  protected static initClient(): Client {
    this.checkConnection("initClient");
    return this.client;
  }

  static initDatabases(): Databases {
    this.checkConnection("initDatabases");
    return new Databases(this.initClient());
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
  ): Promise<Models.Database | undefined> {
    this.checkConnection("createDatabase");

    try {
      await dbwrite.getDatabase(databaseId);
    } catch {
      // If there is no database create a new one.
      try {
        const database = await this.databases.create(
          databaseId,
          databaseName,
          enabled
        );
        return database;
      } catch (error: any) {
        throw new Error(`Dbwrite: Error creating database: ${error.message}`);
      }
    }
  }

  static async getDatabase(databaseId: string): Promise<Models.Database> {
    this.checkConnection("getDatabase");

    try {
      return await this.databases.get(databaseId);
    } catch (error: any) {
      throw new Error(`Dbwrite: Error getting database: ${error.message}`);
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

    try {
      await this.databases.delete(databaseId);
    } catch (error: any) {
      throw new Error(`Dbwrite: Error deleting database: ${error.message}`);
    }
  }
}
