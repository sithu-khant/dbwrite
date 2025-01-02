import type { Models } from "node-appwrite";

import { dbwrite } from "./dbwrite";

export class Database extends dbwrite {
  private databaseId: string;
  private databaseName: string;

  constructor(databaseId: string, databaseName: string) {
    super();

    this.databaseId = databaseId;
    this.databaseName = databaseName;

    dbwrite.createDatabase(databaseId, databaseName);
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
    permissions: string[] = [],
    documentSecurity: boolean = false,
    enabled: boolean = false
  ): Promise<Models.Collection> {
    dbwrite.checkConnection("createCollection");

    const databases = dbwrite.initDatabases();
    return databases.createCollection(
      this.databaseId,
      collectionId,
      collectionName,
      permissions,
      documentSecurity,
      enabled
    );
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
