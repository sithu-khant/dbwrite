// "String" | "Integer" | "Float" | "Boolean" | "Datetime" | "Email" | "IP" | "URL" | "Enum" | "Relationship"
export type SchemaFieldTypeTypes =
  | "String"
  | "Integer"
  | "Float"
  | "Boolean"
  | "Datetime"
  | "Email"
  | "IP"
  | "URL"
  | "Enum"
  | "Relationship";

export type SchemaFieldTypes = {
  type: SchemaFieldTypeTypes;
  required?: boolean;
  default?: any;
  array?: boolean;
  min?: number;
  max?: number;
  enum?: string[]; // For Enum type
  relation?: {
    relatedCollectionId: string; // The related collection ID
    field: string; // The field in the related collection
    type?: "OneToOne" | "OneToMany" | "ManyToMany"; // Optional relationship type
    twoWay?: boolean; // Optional two-way relationship
    twoWayKey?: string; // Optional key for two-way relationship
    onDelete?: "Cascade" | "Restrict" | "SetNull"; // Optional onDelete behavior
  };
};

export type SchemaFieldOptions = {
  _deletedAt?: boolean;
};
