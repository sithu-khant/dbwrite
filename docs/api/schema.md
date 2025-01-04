# `Schema`

The `Schema` class is responsible for defining the structure of a collection in Appwrite. It includes field validation and allows the creation of attributes within an Appwrite collection based on the defined schema. The class supports various field types such as `String`, `Integer`, `Float`, `Boolean`, `Datetime`, `Email`, `IP`, `URL`, `Enum`, and `Relationship`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating a Schema](#creating-a-schema)
  - [Validating the Schema](#validating-the-schema)
  - [Creating Attributes](#creating-attributes)
- [Methods](#methods)
  - [constructor](#constructor)
  - [validateSchema](#validateschema)
  - [createAttributes](#createattributes)
- [Error Handling](#error-handling)

---

## Installation

To install the `Schema` class, ensure you have installed the `dbwrite` package. You can install it using:

```bash
npm install dbwrite
```

Make sure the dependencies like `node-appwrite` are also installed:

```bash
npm install node-appwrite
```

## Usage

### Creating a Schema

To create a schema, instantiate the `Schema` class and define the fields and options.

```js
import { Schema } from "dbwrite";

const schema = new Schema({
  title: { type: "String", required: true },
  price: { type: "Float", min: 0 },
  isActive: { type: "Boolean", default: true },
});
```

### Validating the Schema

Once the schema is defined, you can validate it against incoming data to ensure it meets the required structure.

```js
const data = {
  title: "Product",
  price: 25.99,
};

schema.validateSchema(data);
```

If the data is invalid, an error will be thrown. The validation checks for required fields, field types, enum values, and array lengths.

### Creating Attributes

To create the schema attributes in an Appwrite collection, use the `createAttributes` method. This method will automatically create the necessary fields in the collection based on the schema.

```js
import { dbwrite } from "dbwrite";

const myDatabase = new Database("my-database-id", "My Database Name");
const schema = new Schema({
  title: { type: "String", required: true },
  price: { type: "Float", min: 0 },
});

await schema.createAttributes(
  dbwrite.initDatabases(),
  "my-database-id",
  "my-collection-id"
);
```

## Methods

### `constructor(fields: Record<string, SchemaFieldTypes>, options: SchemaFieldOptions = {})`

Creates a new `Schema` instance with the provided fields and options.

- **Parameters:**
  - `fields`: A record of fields where the key is the field name and the value is the field configuration (type, required, etc.).
  - `options`: Additional options for the schema (optional).

### `validateSchema(data: Record<string, any>): void`

Validates the incoming data against the defined schema. This method checks for required fields, correct data types, enum values, and array length constraints.

- **Parameters:**

  - `data`: The incoming data object to validate.

- **Throws:** Errors if validation fails, with a descriptive error message indicating the issue.

### `createAttributes(initDatabases: Databases, databaseId: string, collectionId: string): Promise<void>`

Creates the attributes defined in the schema in the Appwrite collection. This method ensures the proper field types are created in the collection based on the schema definition.

- **Parameters:**

  - `initDatabases`: An instance of the `Databases` object from Appwrite, used to interact with the database.
  - `databaseId`: The ID of the database.
  - `collectionId`: The ID of the collection in which the attributes will be created.

- **Returns:** A promise that resolves when all attributes are created.

## Error Handling

Errors are thrown during schema validation if the data does not meet the required structure. Errors are descriptive and provide information about the specific issue, such as missing required fields or invalid data types.

For example:

- Missing required fields will throw: `Field "{field_name}" is required.`
- Invalid data types will throw: `Field "{field_name}" must be of type {expected_type}.`
- Invalid enum values will throw: `Field "{field_name}" must be one of: {valid_values}.`
- Invalid array lengths will throw: `Field "{field_name}" must have at least {min_items} items.`

---

**Note:** We wrote this docs with the help of AI. Please report it or make a pull request if you found a typo or a bug.
