import { ID, type Models } from "node-appwrite";
import { dbwrite } from "./dbwrite";
import type { Schema } from "./schema";
import type { Database } from "./database";

export class Model extends dbwrite {
  private readonly database: Database;
  private readonly collectionId: string;
  private readonly collectionName: string;
  private readonly schema: Schema;

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

    this.init();
  }

  private async init(): Promise<void> {
    try {
      await dbwrite
        .createDatabase(this.database.id, this.database.name)
        .then(async () => {
          await this.database.createCollection(
            this.collectionId,
            this.collectionName,
            this.schema
          );
        });
    } catch {
      await this.database.createCollection(
        this.collectionId,
        this.collectionName,
        this.schema
      );
    }
  }

  get id(): string {
    return this.collectionId;
  }

  get name(): string {
    return this.collectionName;
  }

  async listDocuments(queries: string[] = []): Promise<Models.Document[]> {
    dbwrite.checkConnection("listDocuments");

    const databases = dbwrite.initDatabases();
    const documents = await databases.listDocuments(
      this.database.id,
      this.collectionId,
      queries
    );
    return documents.documents;
  }

  async createDocument(data: Record<string, any>): Promise<Models.Document> {
    dbwrite.checkConnection("createDocument");
    this.schema.validateSchema(data);

    const databases = dbwrite.initDatabases();
    return databases.createDocument(
      this.database.id,
      this.collectionId,
      ID.unique(),
      data
    );
  }

  async getDocument(
    documentId: string,
    queries: string[] = []
  ): Promise<Models.Document> {
    dbwrite.checkConnection("getDocument");

    const databases = dbwrite.initDatabases();
    return databases.getDocument(
      this.database.id,
      this.collectionId,
      documentId,
      queries
    );
  }

  async updateDocument(
    documentId: string,
    data: Record<string, any>
  ): Promise<Models.Document> {
    dbwrite.checkConnection("updateDocument");
    this.schema.validateSchema(data);

    const databases = dbwrite.initDatabases();
    return databases.updateDocument(
      this.database.id,
      this.collectionId,
      documentId,
      data
    );
  }

  async deleteDocument(documentId: string): Promise<void> {
    dbwrite.checkConnection("deleteDocument");

    const databases = dbwrite.initDatabases();
    await databases.deleteDocument(
      this.database.id,
      this.collectionId,
      documentId
    );
  }
}
