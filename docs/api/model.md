# `Model`

The `Model` class provides a high-level abstraction for working with documents in Appwrite collections. It allows you to perform CRUD operations on documents, while also enforcing schema validation before creating or updating documents. This class relies on the `dbwrite` and `Schema` classes for managing the database and schema structure.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating a Model](#creating-a-model)
  - [Listing Documents](#listing-documents)
  - [Creating a Document](#creating-a-document)
  - [Getting a Document](#getting-a-document)
  - [Updating a Document](#updating-a-document)
  - [Deleting a Document](#deleting-a-document)
- [Methods](#methods)
  - [constructor](#constructor)
  - [init](#init)
  - [id](#id)
  - [name](#name)
  - [listDocuments](#listdocuments)
  - [createDocument](#createdocument)
  - [getDocument](#getdocument)
  - [updateDocument](#updatedocument)
  - [deleteDocument](#deletedocument)
- [Error Handling](#error-handling)

---

## Installation

To install the `Model` class, ensure you have installed the `dbwrite` package along with its dependencies.

```
npm install dbwrite
```

Make sure that `node-appwrite` is installed:

```
npm install node-appwrite
```

## Usage

### Creating a Model

To create a new model, instantiate the `Model` class with the required parameters:

```js
import { Model } from "dbwrite";
import { Database } from "dbwrite";
import { Schema } from "dbwrite";

// Define a schema
const schema = new Schema({
  title: { type: "String", required: true },
  price: { type: "Float", min: 0 },
});

// Define a database and collection
const database = new Database("my-database-id", "My Database Name");

const model = new Model(database, "my-collection-id", "My Collection", schema);
```

This will automatically create the database and collection if they don't already exist.

### Listing Documents

To list documents in a collection, use the `listDocuments` method:

```js
const documents = await model.listDocuments();
console.log(documents);
```

This will return an array of documents in the collection. You can also pass queries to filter the results.

### Creating a Document

To create a new document in the collection, use the `createDocument` method. The method validates the document data using the defined schema:

```js
const data = {
  title: "Product",
  price: 19.99,
};

const document = await model.createDocument(data);
console.log(document);
```

### Getting a Document

To retrieve a document by its ID, use the `getDocument` method:

```js
const documentId = "your-document-id";
const document = await model.getDocument(documentId);
console.log(document);
```

### Updating a Document

To update an existing document, use the `updateDocument` method:

```js
const documentId = "your-document-id";
const updatedData = {
  price: 24.99,
};

const updatedDocument = await model.updateDocument(documentId, updatedData);
console.log(updatedDocument);
```

### Deleting a Document

To delete a document, use the `deleteDocument` method:

```js
const documentId = "your-document-id";
await model.deleteDocument(documentId);
```

## Methods

### `constructor(database: Database, collectionId: string, collectionName: string, schema: Schema)`

Creates a new `Model` instance for interacting with a specific collection in the database.

- **Parameters:**
  - `database`: An instance of the `Database` class.
  - `collectionId`: The ID of the collection in which documents will be managed.
  - `collectionName`: The name of the collection.
  - `schema`: An instance of the `Schema` class used to validate document data.

### `private async init(): Promise<void>`

This method ensures that the database and collection are created if they don't already exist. It's called automatically when the `Model` instance is created.

### `get id(): string`

A getter for the `collectionId` property. This provides the ID of the collection the model represents.

- **Returns:** The collection ID.

### `get name(): string`

A getter for the `collectionName` property. This provides the name of the collection the model represents.

- **Returns:** The collection name.

### `async listDocuments(queries: string[] = []): Promise<Models.Document[]>`

Lists documents in the specified collection. You can pass queries to filter the results.

- **Parameters:**
  - `queries`: An optional array of queries to filter documents.
- **Returns:** A promise that resolves to an array of documents.

### `async createDocument(data: Schema): Promise<Models.Document>`

Creates a new document in the collection. The provided data is validated using the schema before being added to the collection.

- **Parameters:**

  - `data`: The document data to be created, which should conform to the defined schema.

- **Returns:** A promise that resolves to the created document.

### `async getDocument(documentId: string, queries: string[] = []): Promise<Models.Document>`

Retrieves a document by its ID from the collection.

- **Parameters:**

  - `documentId`: The ID of the document to retrieve.
  - `queries`: An optional array of queries to filter the result.

- **Returns:** A promise that resolves to the requested document.

### `async updateDocument(documentId: string, data: Record<string, any>): Promise<Models.Document>`

Updates an existing document in the collection. The provided data is validated using the schema before updating the document.

- **Parameters:**

  - `documentId`: The ID of the document to update.
  - `data`: The updated document data.

- **Returns:** A promise that resolves to the updated document.

### `async deleteDocument(documentId: string): Promise<void>`

Deletes a document from the collection.

- **Parameters:**

  - `documentId`: The ID of the document to delete.

- **Returns:** A promise that resolves when the document is deleted.

## Error Handling

- Errors are thrown if:
  - The schema validation fails during document creation or update (e.g., missing required fields, invalid data types).
  - There is a failure in communication with Appwrite (e.g., database or collection not found, document not found).

All error messages are descriptive and indicate what went wrong.

---

**Note:** We wrote this docs with the help of AI. Please report it or make a pull request if you found a typo or a bug.
