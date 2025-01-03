import type { Models } from "node-appwrite";
import { dbwrite } from "./dbwrite";
import type { Schema } from "./schema";

export class Database extends dbwrite {
  private readonly databaseId: string;
  private readonly databaseName: string;

  constructor(databaseId: string, databaseName: string) {
    super();

    this.databaseId = databaseId;
    this.databaseName = databaseName;
    this.createDatabase().catch(console.error);
  }

  private async createDatabase(): Promise<void> {
    await dbwrite.createDatabase(this.databaseId, this.databaseName);
  }

  get id(): string {
    return this.databaseId;
  }

  get name(): string {
    return this.databaseName;
  }

  async listCollections(
    queries: string[] = [],
    search = ""
  ): Promise<Models.CollectionList> {
    dbwrite.checkConnection("listCollections");

    const databases = dbwrite.initDatabases();
    return databases.listCollections(
      this.databaseId,
      queries,
      search || undefined
    );
  }

  async getCollection(collectionId: string): Promise<Models.Collection> {
    dbwrite.checkConnection("getCollection");

    const databases = dbwrite.initDatabases();
    return databases.getCollection(this.databaseId, collectionId);
  }

  async createCollection(
    collectionId: string,
    collectionName: string,
    schema: Schema,
    permissions: string[] = [],
    documentSecurity = false,
    enabled = false
  ): Promise<Models.Collection | undefined> {
    dbwrite.checkConnection("createCollection");

    try {
      await this.getCollection(collectionId);
    } catch {
      const databases = dbwrite.initDatabases();
      const result = await databases.createCollection(
        this.databaseId,
        collectionId,
        collectionName,
        permissions,
        documentSecurity,
        enabled
      );

      await schema.createAttributes(databases, this.databaseId, collectionId);
      return result;
    }
  }

  async updateCollection(
    collectionId: string,
    collectionName: string,
    permissions: string[] = [],
    documentSecurity = false,
    enabled = false
  ): Promise<Models.Collection> {
    dbwrite.checkConnection("updateCollection");

    const databases = dbwrite.initDatabases();
    return databases.updateCollection(
      this.databaseId,
      collectionId,
      collectionName,
      permissions,
      documentSecurity,
      enabled
    );
  }

  async deleteCollection(collectionId: string): Promise<void> {
    dbwrite.checkConnection("deleteCollection");

    const databases = dbwrite.initDatabases();
    await databases.deleteCollection(this.databaseId, collectionId);
  }
}
