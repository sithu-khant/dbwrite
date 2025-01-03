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
    database.createCollection(collectionId, collectionName, schema);
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

  private validateSchema(data: Record<string, any>): void {
    for (const key in this.schema.fields) {
      const field = this.schema.fields[key];
      if (field.required && data[key] === undefined) {
        throw new Error(`Field ${key} is required.`);
      }

      if (field.type && typeof data[key] !== typeof field.type()) {
        throw new Error(
          `Field "${key}" must be of type ${typeof field.type()}.`
        );
      }
    }
  }

  async createDocument(data: Record<string, any>): Promise<Models.Document> {
    dbwrite.checkConnection("save()");
    this.validateSchema(data);

    const databases = dbwrite.initDatabases();
    const document = await databases.createDocument(
      this.database.getId(),
      this.collectionId,
      ID.unique(),
      data
    );

    return document;
  }
}
