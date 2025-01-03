import type { Models } from "node-appwrite";

import { dbwrite } from "./dbwrite";
import type { Schema } from "./schema";

export class Database extends dbwrite {
  private databaseId: string;
  private databaseName: string;

  constructor(databaseId: string, databaseName: string) {
    super();

    this.databaseId = databaseId;
    this.databaseName = databaseName;

    // Create a database after initialization
    this.createDatabase();
  }

  private async createDatabase() {
    await dbwrite.createDatabase(this.databaseId, this.databaseName);
  }

  getId(): string {
    return this.databaseId;
  }

  getName(): string {
    return this.databaseName;
  }

  async listCollections(
    queries: [] = [],
    search: string = ""
  ): Promise<Models.CollectionList> {
    dbwrite.checkConnection("listCollections");

    const databases = dbwrite.initDatabases();
    return search !== ""
      ? databases.listCollections(this.databaseId, queries, search)
      : databases.listCollections(this.databaseId, queries);
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
    documentSecurity: boolean = false,
    enabled: boolean = false
  ): Promise<Models.Collection | undefined> {
    dbwrite.checkConnection("createCollection");

    const existingCollection = await this.getCollection(collectionId);

    // Don't create a new collection if there is a existing one
    if (existingCollection.$id !== collectionId) {
      const databases = dbwrite.initDatabases();

      const result = databases.createCollection(
        this.databaseId,
        collectionId,
        collectionName,
        permissions,
        documentSecurity,
        enabled
      );

      // Create attribute fields
      schema.createAttributes(databases, this.databaseId, collectionId);

      return result;
    }
  }

  async updateCollection(
    collectionId: string,
    collectionName: string,
    permissions: string[] = [],
    documentSecurity: boolean = false,
    enabled: boolean = false
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
