import { ID, type Models } from "node-appwrite";

import { dbwrite } from "./dbwrite";
import type { Schema } from "./schema";

export class Model extends dbwrite {
  private databaseId: string;
  private collectionId: string;
  private collectionName: string;
  private schema: Schema;

  constructor(
    databaseId: string,
    collectionId: string,
    collectionName: string,
    schema: Schema
  ) {
    super();

    this.databaseId = databaseId;
    this.collectionId = collectionId;
    this.collectionName = collectionName;
    this.schema = schema;
  }

  async getDocument(
    documentId: string,
    queries: [] = []
  ): Promise<Models.Document> {
    dbwrite.checkConnection("getDocument()");

    const databases = dbwrite.getDatabases();
    const document = await databases.getDocument(
      this.databaseId,
      this.collectionId,
      documentId,
      queries
    );

    return document;
  }

  async listDocuments(queries: [] = []): Promise<Models.Document[]> {
    dbwrite.checkConnection("listDocuments()");

    const databases = dbwrite.getDatabases();
    const documents = await databases.listDocuments(
      this.databaseId,
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

    const databases = dbwrite.getDatabases();
    const document = await databases.createDocument(
      this.databaseId,
      this.collectionId,
      ID.unique(),
      data
    );

    return document;
  }
}
