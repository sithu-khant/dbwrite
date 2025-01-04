import {
  RelationMutate,
  RelationshipType,
  type Databases,
} from "node-appwrite";

// Define the valid field types
type FieldType =
  | String
  | Number
  | Boolean
  | Date
  | String[]
  | Record<string, any>;

type FieldDefinition = {
  type: FieldType;
  required?: boolean;
  default?: any;
  array?: boolean;
  min?: number;
  max?: number;
  enum?: string[]; // For Enum type
  relation?: {
    relatedCollectionId: string; // The related collection ID
    field: string; // The field in the related collection
    type?:
      | RelationshipType.OneToOne
      | RelationshipType.OneToMany
      | RelationshipType.ManyToMany; // Optional relationship type
    twoWay?: boolean; // Optional two-way relationship
    twoWayKey?: string; // Optional key for two-way relationship
    onDelete?:
      | RelationMutate.Cascade
      | RelationMutate.Restrict
      | RelationMutate.SetNull; // Optional onDelete behavior
  };
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

  // Validate the schema against incoming data
  validateSchema(data: Record<string, any>): void {
    for (const key in this.fields) {
      const field = this.fields[key];

      // Check required fields
      if (field.required && data[key] === undefined) {
        throw new Error(`Field "${key}" is required.`);
      }

      // Check field types
      if (field.type && typeof data[key] !== typeof field.default) {
        throw new Error(
          `Field "${key}" must be of type ${typeof field.default}.`
        );
      }

      // Check Enum values
      if (field.enum && !field.enum.includes(data[key])) {
        throw new Error(
          `Field "${key}" must be one of: ${field.enum.join(", ")}.`
        );
      }

      // Check array length for Array type
      if (field.array && Array.isArray(data[key])) {
        if (field.min && data[key].length < field.min) {
          throw new Error(
            `Field "${key}" must have at least ${field.min} items.`
          );
        }
        if (field.max && data[key].length > field.max) {
          throw new Error(
            `Field "${key}" must have no more than ${field.max} items.`
          );
        }
      }

      // Additional validations for other field types can go here...
    }
  }

  // Create the schema attributes in Appwrite
  async createAttributes(
    initDatabases: Databases,
    databaseId: string,
    collectionId: string
  ) {
    for (const key in this.fields) {
      const field = this.fields[key];

      // String attribute
      if (field.type === String) {
        await initDatabases.createStringAttribute(
          databaseId,
          collectionId,
          key,
          field.max || 255, // You can add a max length, default to 255
          field.required || false
        );
      }

      // Integer attribute
      if (field.type === Number && Number.isInteger(field.default)) {
        await initDatabases.createIntegerAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false,
          field.min || 0,
          field.max || 100000
        );
      }

      // Float attribute
      if (field.type === Number && !Number.isInteger(field.default)) {
        await initDatabases.createFloatAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false,
          field.min || 0.0,
          field.max || 100000.0
        );
      }

      // Boolean attribute
      if (field.type === Boolean) {
        await initDatabases.createBooleanAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // Datetime attribute
      if (field.type === Date) {
        await initDatabases.createDatetimeAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // Email attribute
      if (field.type === String && field.enum?.includes("email")) {
        await initDatabases.createEmailAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // IP attribute
      if (field.type === String && field.enum?.includes("ip")) {
        await initDatabases.createIpAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // URL attribute
      if (field.type === String && field.enum?.includes("url")) {
        await initDatabases.createUrlAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // Enum attribute
      if (field.enum) {
        await initDatabases.createEnumAttribute(
          databaseId,
          collectionId,
          key, // key
          field.enum, // enum elements
          field.required || false, // required
          field.default || "", // default (optional)
          field.array || false // array (optional)
        );
      }

      // Relation attribute (a reference to another collection)
      if (field.relation) {
        const {
          relatedCollectionId,
          field: relField,
          type = RelationshipType.OneToOne, // Default type is OneToOne
          twoWay = false, // Default to false if not provided
          twoWayKey = "", // Default empty string if not provided
          onDelete = RelationMutate.Cascade, // Default to Cascade if not provided
        } = field.relation;

        await initDatabases.createRelationshipAttribute(
          databaseId,
          collectionId,
          relatedCollectionId, // related collection ID
          type, // relationship type, could be OneToOne, OneToMany, or ManyToMany
          twoWay, // two-way relationship (optional)
          key, // key (optional)
          twoWayKey, // two-way key (optional)
          onDelete // onDelete behavior (Cascade, Restrict, SetNull)
        );
      }
    }
  }
}
