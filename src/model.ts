import { ID, type Models } from "node-appwrite";

import { dbwrite } from "./dbwrite";
import type { Schema } from "./schema";
import type { Database } from "./database";

export class Model extends dbwrite {
  private database: Database;
  private collectionId: string;
  private collectionName: string;
  private schema: Schema;

  constructor(
    database: Database,
    collectionId: string,
    collectionName: string,
    schema: Schema
  ) {
    super();

    this.database = database;
    this.collectionId = collectionId;
    this.collectionName = collectionName;
    this.schema = schema;

    // Create a collection after initialization
    this.createCollection();
  }

  private async createCollection() {
    await this.database.createCollection(
      this.collectionId,
      this.collectionName,
      this.schema
    );
  }

  get getId(): string {
    return this.collectionId;
  }

  get getName(): string {
    return this.collectionName;
  }

  async listDocuments(queries: [] = []): Promise<Models.Document[]> {
    dbwrite.checkConnection("listDocuments()");

    const databases = dbwrite.initDatabases();
    const documents = await databases.listDocuments(
      this.database.getId(),
      this.collectionId,
      queries
    );

    return documents.documents;
  }

  async createDocument(data: Schema): Promise<Models.Document> {
    dbwrite.checkConnection("createDocument()");

    this.schema.validateSchema(data);

    const databases = dbwrite.initDatabases();
    const document = await databases.createDocument(
      this.database.getId(),
      this.collectionId,
      ID.unique(),
      data
    );

    return document;
  }

  async getDocument(
    documentId: string,
    queries: [] = []
  ): Promise<Models.Document> {
    dbwrite.checkConnection("getDocument()");

    const databases = dbwrite.initDatabases();
    const document = await databases.getDocument(
      this.database.getId(),
      this.collectionId,
      documentId,
      queries
    );

    return document;
  }

  async updateDocument(
    documentId: string,
    data: Record<string, any>
  ): Promise<Models.Document> {
    dbwrite.checkConnection("updateDocument()");
    this.schema.validateSchema(data);

    const databases = dbwrite.initDatabases();
    const updatedDocument = await databases.updateDocument(
      this.database.getId(),
      this.collectionId,
      documentId,
      data
    );

    return updatedDocument;
  }

  async deleteDocument(documentId: string): Promise<void> {
    dbwrite.checkConnection("deleteDocument()");

    const databases = dbwrite.initDatabases();
    await databases.deleteDocument(
      this.database.getId(),
      this.collectionId,
      documentId
    );
  }
}
