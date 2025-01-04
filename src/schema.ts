import {
  RelationMutate,
  RelationshipType,
  type Databases,
} from "node-appwrite";

import type { SchemaFieldTypes, SchemaFieldOptions } from "./types";

export class Schema {
  fields: Record<string, SchemaFieldTypes>;
  options: SchemaFieldOptions;

  constructor(
    fields: Record<string, SchemaFieldTypes>,
    options: SchemaFieldOptions = {}
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
      console.log(`Dbwrite: Creating "${key}" attribute...`);

      // String attribute
      if (field.type === "String") {
        await initDatabases.createStringAttribute(
          databaseId,
          collectionId,
          key,
          field.max || 255, // You can add a max length, default to 255
          field.required || false
        );
      }

      // Integer attribute
      if (field.type === "Integer") {
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
      if (field.type === "Float") {
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
      if (field.type === "Boolean") {
        await initDatabases.createBooleanAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // Datetime attribute
      if (field.type === "Datetime") {
        await initDatabases.createDatetimeAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // Email attribute
      if (field.type === "Email") {
        await initDatabases.createEmailAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // IP attribute
      if (field.type === "IP") {
        await initDatabases.createIpAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // URL attribute
      if (field.type === "URL") {
        await initDatabases.createUrlAttribute(
          databaseId,
          collectionId,
          key,
          field.required || false
        );
      }

      // Enum attribute
      if (field.type === "Enum") {
        await initDatabases.createEnumAttribute(
          databaseId,
          collectionId,
          key, // key
          (field.enum = []), // enum elements
          field.required || false, // required
          field.default || "", // default (optional)
          field.array || false // array (optional)
        );
      }

      // Relation attribute (a reference to another collection)
      if (field.relation) {
        let {
          relatedCollectionId,
          field: relField,
          type = "OneToOne", // Default type is OneToOne
          twoWay = false, // Default to false if not provided
          twoWayKey = "", // Default empty string if not provided
          onDelete = "Cascade", // Default to Cascade if not provided
        } = field.relation;

        await initDatabases.createRelationshipAttribute(
          databaseId,
          collectionId,
          relatedCollectionId, // related collection ID
          type === "OneToOne"
            ? RelationshipType.OneToMany
            : type === "OneToMany"
            ? RelationshipType.ManyToMany
            : RelationshipType.ManyToMany, // relationship type, could be OneToOne, OneToMany, or ManyToMany
          twoWay, // two-way relationship (optional)
          key, // key (optional)
          twoWayKey, // two-way key (optional)
          onDelete === "Cascade"
            ? RelationMutate.Cascade
            : onDelete === "Restrict"
            ? RelationMutate.Restrict
            : RelationMutate.SetNull // onDelete behavior (Cascade, Restrict, SetNull)
        );
      }
    }
  }
}
