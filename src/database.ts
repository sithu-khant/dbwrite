import type { Models } from "node-appwrite";
import { dbwrite } from "./dbwrite";

export class Database extends dbwrite {
  private databaseId: string;
  private databaseName: string;

  constructor(databaseId: string, databaseName: string) {
    super();

    this.databaseId = databaseId;
    this.databaseName = databaseName;
  }

  static async listCollections(
    databaseId: string,
    queries: [] = [],
    search: string = ""
  ): Promise<Models.CollectionList> {
    this.checkConnection("listCollections");

    const databases = super.initDatabases();
    return search !== ""
      ? databases.listCollections(databaseId, queries, search)
      : databases.listCollections(databaseId, queries);
  }

  static async getCollection(
    databaseId: string,
    collectionId: string
  ): Promise<Models.Collection> {
    this.checkConnection("getCollection");

    const databases = super.initDatabases();
    return databases.getCollection(databaseId, collectionId);
  }

  static async createCollection(
    databaseId: string,
    collectionId: string,
    collectionName: string,
    permissions: string[] = [],
    documentSecurity: boolean = false,
    enabled: boolean = false
  ): Promise<Models.Collection> {
    this.checkConnection("createCollection");

    const databases = super.initDatabases();
    return databases.createCollection(
      databaseId,
      collectionId,
      collectionName,
      permissions,
      documentSecurity,
      enabled
    );
  }

  static async updateCollection(
    databaseId: string,
    collectionId: string,
    collectionName: string,
    permissions: string[] = [],
    documentSecurity: boolean = false,
    enabled: boolean = false
  ): Promise<Models.Collection> {
    this.checkConnection("updateCollection");

    const databases = super.initDatabases();
    return databases.updateCollection(
      databaseId,
      collectionId,
      collectionName,
      permissions,
      documentSecurity,
      enabled
    );
  }

  static async deleteCollection(
    databaseId: string,
    collectionId: string
  ): Promise<void> {
    this.checkConnection("deleteCollection");

    const databases = super.initDatabases();
    await databases.deleteCollection(databaseId, collectionId);
  }
}
