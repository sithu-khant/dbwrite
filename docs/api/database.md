# `Database`

The `Database` class extends the `dbwrite` class and provides an interface for managing collections within a specific Appwrite database. It includes methods for listing, creating, updating, and deleting collections. The `Database` class also ensures that the database is created if it does not exist.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating a Database](#creating-a-database)
  - [Listing Collections](#listing-collections)
  - [Getting a Collection](#getting-a-collection)
  - [Creating a Collection](#creating-a-collection)
  - [Updating a Collection](#updating-a-collection)
  - [Deleting a Collection](#deleting-a-collection)
- [Methods](#methods)
  - [constructor](#constructor)
  - [id](#id)
  - [name](#name)
  - [listCollections](#listcollections)
  - [getCollection](#getcollection)
  - [createCollection](#createcollection)
  - [updateCollection](#updatecollection)
  - [deleteCollection](#deletecollection)
- [Error Handling](#error-handling)

---

## Installation

To install `Database`, ensure you have already installed the `dbwrite` package. You can install it using:

```bash
npm install dbwrite
```

Make sure the dependencies like `node-appwrite` are also installed:

```bash
npm install node-appwrite
```

## Usage

### Creating a Database

To create a new database, simply instantiate the `Database` class with the required `databaseId` and `databaseName`. If the database doesn't already exist, it will be created automatically.

```js
import { Database } from "dbwrite";

const myDatabase = new Database("new-database-id", "New Database Name");
```

### Listing Collections

To list all collections within a specific database:

```js
const collections = await myDatabase.listCollections();
console.log(collections);
```

### Getting a Collection

To retrieve a specific collection by its ID:

```js
const collection = await myDatabase.getCollection("existing-collection-id");
console.log(collection);
```

### Creating a Collection

To create a new collection within the database:

```js
const collection = await myDatabase.createCollection(
  "new-collection-id",
  "New Collection Name",
  schema,
  ["read", "write"],
  false,
  true
);
console.log(collection);
```

### Updating a Collection

To update an existing collection's properties:

```js
const updatedCollection = await myDatabase.updateCollection(
  "existing-collection-id",
  "Updated Collection Name",
  ["read", "write"],
  false,
  true
);
console.log(updatedCollection);
```

### Deleting a Collection

To delete a collection:

```js
await myDatabase.deleteCollection("existing-collection-id");
console.log("Collection deleted");
```

## Methods

### `constructor(databaseId: string, databaseName: string)`

Creates a new `Database` instance. The constructor automatically calls `dbwrite.createDatabase` to create the database if it does not already exist.

- **Parameters:**
  - `databaseId`: The ID of the database.
  - `databaseName`: The name of the database.

### get `id(): string`

Returns the ID of the current database.

- **Returns:** The `databaseId` string.

### get `name(): string`

Returns the name of the current database.

- **Returns:** The `databaseName` string.

### `listCollections(queries: string[] = [], search: string = ""): Promise<Models.CollectionList>`

Lists all collections in the current database. Optionally, you can provide query parameters or a search string.

- **Parameters:**

  - `queries`: Array of queries to filter collections (optional).
  - `search`: A search string to match against collection names (optional).

- **Returns:** A promise that resolves with a list of collections.

### `getCollection(collectionId: string): Promise<Models.Collection>`

Retrieves a specific collection by its ID.

- **Parameters:**

  - `collectionId`: The ID of the collection to retrieve.

- **Returns:** A promise that resolves with the requested collection.

### `createCollection(collectionId: string, collectionName: string, schema: Schema, permissions: string[] = [], documentSecurity = false, enabled = false): Promise<Models.Collection>`

Creates a new collection within the current database. If the collection already exists, it will be returned instead.

- **Parameters:**

  - `collectionId`: The ID of the collection to create.
  - `collectionName`: The name of the collection.
  - `schema`: The schema to define the collection attributes.
  - `permissions`: Array of permissions (optional).
  - `documentSecurity`: Boolean indicating if document security is enabled (optional).
  - `enabled`: Boolean indicating if the collection is enabled (optional).

- **Returns:** A promise that resolves with the created or existing collection.

### `updateCollection(collectionId: string, collectionName: string, permissions: string[] = [], documentSecurity = false, enabled = false): Promise<Models.Collection>`

Updates the properties of an existing collection.

- **Parameters:**

  - `collectionId`: The ID of the collection to update.
  - `collectionName`: The new name of the collection.
  - `permissions`: Array of permissions (optional).
  - `documentSecurity`: Boolean indicating if document security is enabled (optional).
  - `enabled`: Boolean indicating if the collection is enabled (optional).

- **Returns:** A promise that resolves with the updated collection.

### `deleteCollection(collectionId: string): Promise<void>`

Deletes a specific collection from the current database.

- **Parameters:**

  - `collectionId`: The ID of the collection to delete.

- **Returns:** A promise that resolves when the collection is deleted.

## Error Handling

Errors are thrown when there is a failure in any of the methods, typically due to connection issues, invalid API calls, or issues with the collection data. The error messages are descriptive and will specify the method that caused the issue.

---

**Note:** We wrote this docs with the help of AI. Please report it or make a pull request if you found a typo or a bug.
