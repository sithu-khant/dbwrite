# `dbwrite`

The `dbwrite` class provides an interface for interacting with Appwrite databases, offering an abstraction similar to Mongoose for MongoDB. It allows for database management operations such as creating, retrieving, updating, listing, and deleting databases in a simple and efficient manner.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Connecting to Appwrite](#connecting-to-appwrite)
  - [Listing Databases](#listing-databases)
  - [Creating a Database](#creating-a-database)
  - [Getting a Database](#getting-a-database)
  - [Updating a Database](#updating-a-database)
  - [Deleting a Database](#deleting-a-database)
- [Methods](#methods)
  - [connect](#connect)
  - [listDatabases](#listdatabases)
  - [createDatabase](#createdatabase)
  - [getDatabase](#getdatabase)
  - [updateDatabase](#updatedatabase)
  - [deleteDatabase](#deletedatabase)
- [Error Handling](#error-handling)

---

## Installation

To install `dbwrite`, run the following command:

```bash
npm install dbwrite
```

Make sure to install the necessary dependencies as well, such as `node-appwrite`:

```bash
npm install node-appwrite
```

## Usage

### Connecting to Appwrite

To start using `dbwrite`, you need to establish a connection to your Appwrite instance.

```js
import { dbwrite } from "dbwrite";

dbwrite.connect(
  "https://your-appwrite-endpoint",
  "your-project-id",
  "your-api-key"
);
```

### Listing Databases

To list all databases, use the `listDatabases` method. You can optionally provide query parameters or a search string.

```js
const databases = await dbwrite.listDatabases();
console.log(databases);
```

### Creating a Database

If you want to create a new database, you can use the `createDatabase` method. If the database already exists, it will return the existing one.

```js
const database = await dbwrite.createDatabase(
  "new-database-id",
  "New Database"
);
console.log(database);
```

### Getting a Database

To retrieve an existing database by its ID:

```js
const database = await dbwrite.getDatabase("existing-database-id");
console.log(database);
```

### Updating a Database

To update an existing database's properties (e.g., name, enabled status):

```js
const updatedDatabase = await dbwrite.updateDatabase(
  "existing-database-id",
  "Updated Database Name"
);
console.log(updatedDatabase);
```

### Deleting a Database

To delete an existing database by its ID:

```js
await dbwrite.deleteDatabase("existing-database-id");
console.log("Database deleted");
```

## Methods

### connect

##### `connect(endpoint: string, projectId: string, apiKey: string): void`

Establishes a connection to the Appwrite instance using the provided endpoint, project ID, and API key.

- **Parameters:**
  - `endpoint`: The URL of the Appwrite server.
  - `projectId`: The ID of the project you are working with.
  - `apiKey`: Your Appwrite API key.

### listDatabases

##### `listDatabases(queries: string[] = [], search: string = ""): Promise<Models.DatabaseList>`

Lists all available databases. Optionally, you can filter the results using query parameters or a search string.

- **Parameters:**

  - `queries`: Array of queries to filter the databases (optional).
  - `search`: A search string to match against database names (optional).

- **Returns:** A promise that resolves with a list of databases.

### createDatabase

##### `createDatabase(databaseId: string, databaseName: string, enabled: boolean = false): Promise<Models.Database>`

Creates a new database with the specified ID and name. If a database with the same ID already exists, it is returned instead.

- **Parameters:**

  - `databaseId`: The ID of the database to create.
  - `databaseName`: The name of the database to create.
  - `enabled`: A boolean indicating whether the database is enabled (optional).

- **Returns:** A promise that resolves with the created or existing database.

### getDatabase

##### `getDatabase(databaseId: string): Promise<Models.Database>`

Retrieves a specific database by its ID.

- **Parameters:**

  - `databaseId`: The ID of the database to retrieve.

- **Returns:** A promise that resolves with the requested database.

### updateDatabase

##### `updateDatabase(databaseId: string, databaseName: string, enabled: boolean = false): Promise<Models.Database>`

Updates the properties (name and enabled status) of an existing database.

- **Parameters:**

  - `databaseId`: The ID of the database to update.
  - `databaseName`: The new name for the database.
  - `enabled`: A boolean indicating whether the database should be enabled (optional).

- **Returns:** A promise that resolves with the updated database.

### deleteDatabase

##### `deleteDatabase(databaseId: string): Promise<void>`

Deletes a specific database by its ID.

- **Parameters:**

  - `databaseId`: The ID of the database to delete.

- **Returns:** A promise that resolves when the database is deleted.

## Error Handling

Errors are thrown when there is a failure in any of the methods, typically due to connection issues or invalid API calls. The error messages are descriptive and will specify the method that caused the issue.

---

**Note:** We wrote this docs with the help of AI. Please report it or make a pull request if you found a typo or a bug.
