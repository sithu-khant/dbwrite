import type { Databases } from "node-appwrite";

type FieldDefinition = {
  type: any;
  required?: boolean;
};

type SchemaOptions = {
  _deletedAt?: boolean;
};

export class Schema {
  fields: Record<string, FieldDefinition>;
  options: SchemaOptions;

  constructor(
    fields: Record<string, FieldDefinition>,
    options: SchemaOptions = {}
  ) {
    this.fields = fields;
    this.options = options;
  }

  validateSchema(data: Record<string, any>): void {
    for (const key in this.fields) {
      const field = this.fields[key];

      // Check required fields
      if (field.required && data[key] === undefined) {
        throw new Error(`Field "${key}" is required.`);
      }

      // Check field types
      if (field.type && typeof data[key] !== typeof field.type()) {
        throw new Error(
          `Field "${key}" must be of type ${typeof field.type()}.`
        );
      }
    }
  }

  async createAttributes(
    initDatabases: Databases,
    databaseId: string,
    collectionId: string
  ) {
    for (const key in this.fields) {
      // String attribute
      if (this.fields[key].type === String) {
        await initDatabases.createStringAttribute(
          databaseId,
          collectionId,
          key,
          1,
          false
        );
      }
    }
  }
}
