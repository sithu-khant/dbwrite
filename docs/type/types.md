# `types`

This file contains TypeScript types that define the structure and configuration of schema fields in your Appwrite database. These types are used to define the fields, their properties, and their options when creating a schema in the `Schema` class.

## Table of Contents

- [SchemaFieldTypeTypes](#schemafieldtypetypes)
- [SchemaFieldTypes](#schemafieldtypes)
- [SchemaFieldOptions](#schemafieldoptions)

---

## `SchemaFieldTypeTypes`

The `SchemaFieldTypeTypes` type defines the valid field types that can be assigned to a schema field. These types correspond to the data types supported by Appwrite.

### Possible Values:

- `"String"`: A string of characters.
- `"Integer"`: A whole number.
- `"Float"`: A floating-point number.
- `"Boolean"`: A true/false value.
- `"Datetime"`: A timestamp or date.
- `"Email"`: An email address.
- `"IP"`: An IP address.
- `"URL"`: A URL string.
- `"Enum"`: A set of predefined values (enum).
- `"Relationship"`: A relationship to another collection.

---

## `SchemaFieldTypes`

The `SchemaFieldTypes` type defines the structure of a field in a schema, including its type and optional configurations. Each field has the following properties:

### Properties:

- `type`: **SchemaFieldTypeTypes**  
  The type of the field. This must be one of the types defined in `SchemaFieldTypeTypes`.

- `required`: **boolean (optional)**  
  If `true`, the field is required. If `false` or not provided, the field is optional.

- `default`: **any (optional)**  
  A default value for the field if no value is provided when creating or updating documents.

- `array`: **boolean (optional)**  
  If `true`, the field will be treated as an array (list of values). Defaults to `false` if not provided.

- `min`: **number (optional)**  
  The minimum value for numeric fields (e.g., `Integer`, `Float`) or the minimum length for array-type fields.

- `max`: **number (optional)**  
  The maximum value for numeric fields (e.g., `Integer`, `Float`) or the maximum length for array-type fields.

- `enum`: **string[] (optional)**  
  An array of valid values for `Enum` type fields. The value must be one of the items in this array.

- `relation`: **object (optional)**  
  If the field is a relationship to another collection, this object defines the relationship properties. The `relation` object has the following properties:

  - `relatedCollectionId`: **string**  
    The ID of the related collection that the field references.

  - `field`: **string**  
    The field in the related collection that the relationship will reference.

  - `type`: **"OneToOne" | "OneToMany" | "ManyToMany" (optional)**  
    The type of relationship. Defaults to `"OneToOne"` if not provided.

  - `twoWay`: **boolean (optional)**  
    If `true`, the relationship is bidirectional.

  - `twoWayKey`: **string (optional)**  
    The key used for the reverse relationship if the relationship is bidirectional.

  - `onDelete`: **"Cascade" | "Restrict" | "SetNull" (optional)**  
    Defines the behavior when the related document is deleted:
    - `"Cascade"`: Delete related documents.
    - `"Restrict"`: Prevent deletion if related documents exist.
    - `"SetNull"`: Set the related field to `null` when the related document is deleted.

---

## `SchemaFieldOptions`

The `SchemaFieldOptions` type defines additional optional configurations for a schema.

### Properties:

- `_deletedAt`: **boolean (optional)**  
  This option is used to track when the schema was deleted. It is useful for implementing soft deletes.

---

These types are used in conjunction with the `Schema` class to define the structure, validation rules, and options for fields within your Appwrite database schema.

---

**Note:** We wrote this docs with the help of AI. Please report it or make a pull request if you found a typo or a bug.
