# Quick Start Guide: Building a Bookstore with `dbwrite`

In this quick start guide, you'll learn how to set up a simple bookstore application using the `dbwrite` library. We'll create a database to store books, define a schema for book data, and use the `Model` class to interact with the database.

## Prerequisites

Before you begin, make sure you have:

- Node.js and npm installed (or) Bun.
- An Appwrite instance set up and accessible.
- The `dbwrite` library installed in your project.

Install the required dependencies:

```bash
npm install dbwrite node-appwrite
```

## Step 1: Connect to Appwrite

The first step is to connect to your Appwrite instance. Use the `dbwrite.connect` method to establish a connection by providing your Appwrite endpoint, project ID, and API key.

```js
import { dbwrite } from "dbwrite";

// Connect to Appwrite
dbwrite.connect(
  "https://your-appwrite-instance.com",
  "your-project-id",
  "your-api-key"
);
```

## Step 2: Define the Book Schema

The schema defines the structure of the documents you want to store in your collection. For a bookstore, we'll create a schema with fields like `title`, `author`, `price`, and `publishedDate`.

```js
import { Schema } from "dbwrite";

const bookSchema = new Schema({
  title: { type: "String", required: true },
  author: { type: "String", required: true },
  price: { type: "Float", min: 0, required: true },
  publishedDate: { type: "Datetime", required: true },
});
```

- `title`: A required string representing the title of the book.
- `author`: A required string representing the book's author.
- `price`: A required float representing the price of the book.
- `publishedDate`: A required datetime representing when the book was published.

## Step 3: Create a Database and Collection

We'll use the `Database` and `Model` classes from `dbwrite` to interact with Appwrite. First, create a `Database` instance and then define the collection where the books will be stored.

```js
import { Database } from "dbwrite";
import { Model } from "dbwrite";

// Create a new database instance
const database = new Database("my-database-id", "Bookstore Database");

// Create a new model for the "Books" collection
const bookModel = new Model(
  database,
  "books", // Collection ID
  "Books", // Collection Name
  bookSchema
);
```

Here, we create a database called "Bookstore Database" and a collection called "Books" to store book documents.

## Step 4: Add a Book

Now that the database and collection are set up, we can add books to the collection. Use the `createDocument` method to add a new book.

```js
const newBook = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 10.99,
  publishedDate: new Date("1925-04-10T00:00:00Z"),
};

const createdBook = await bookModel.createDocument(newBook);
console.log("Created book:", createdBook);
```

This will add a new book to the "Books" collection. The `createDocument` method validates the data against the schema before adding it to the collection.

## Step 5: List All Books

To retrieve all books in the collection, use the `listDocuments` method. You can pass optional queries to filter the results, but for this example, we'll list all books.

```js
const books = await bookModel.listDocuments();
console.log("Books in the collection:", books);
```

This will return an array of documents from the "Books" collection.

## Step 6: Get a Single Book by ID

If you want to fetch a specific book by its ID, use the `getDocument` method:

```js
const bookId = "your-book-id-here"; // Replace with an actual book ID
const book = await bookModel.getDocument(bookId);
console.log("Fetched book:", book);
```

This will return the details of the book with the provided ID.

## Step 7: Update a Book

To update a book's details, use the `updateDocument` method. For example, let's update the price of a book:

```js
const updatedData = { price: 12.99 };
const updatedBook = await bookModel.updateDocument(bookId, updatedData);
console.log("Updated book:", updatedBook);
```

This will update the price of the book with the provided `bookId`.

## Step 8: Delete a Book

To delete a book from the collection, use the `deleteDocument` method:

```js
await bookModel.deleteDocument(bookId);
console.log("Book deleted successfully");
```

This will delete the book with the specified `bookId`.

---

## Full Example

Here’s the complete code that sets up the bookstore:

```js
import { Database, Model, Schema } from "dbwrite";

// Connect to Appwrite
dbwrite.connect(
  "https://your-appwrite-instance.com",
  "your-project-id",
  "your-api-key"
);

// Define the book schema
const bookSchema = new Schema({
  title: { type: "String", required: true },
  author: { type: "String", required: true },
  price: { type: "Float", min: 0, required: true },
  publishedDate: { type: "Datetime", required: true },
});

// Create a database instance
const database = new Database("my-database-id", "Bookstore Database");

// Create a book model
const bookModel = new Model(
  database,
  "books", // Collection ID
  "Books", // Collection Name
  bookSchema
);

// Add a new book
const newBook = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 10.99,
  publishedDate: new Date("1925-04-10T00:00:00Z"),
};

const createdBook = await bookModel.createDocument(newBook);
console.log("Created book:", createdBook);

// List all books
const books = await bookModel.listDocuments();
console.log("Books in the collection:", books);

// Get a book by ID
const bookId = "your-book-id-here";
const book = await bookModel.getDocument(bookId);
console.log("Fetched book:", book);

// Update a book's price
const updatedData = { price: 12.99 };
const updatedBook = await bookModel.updateDocument(bookId, updatedData);
console.log("Updated book:", updatedBook);

// Delete a book
await bookModel.deleteDocument(bookId);
console.log("Book deleted successfully");
```

---

## Conclusion

With just a few lines of code, you've set up a basic bookstore application using the `dbwrite` library, Appwrite, and TypeScript. You can now perform CRUD operations on your bookstore's collection of books.

For more advanced features, you can explore adding additional fields to your schema, implementing more complex queries, and handling more complex relationships between documents.

---

**Note:** We wrote this docs with the help of AI. Please report it or make a pull request if you found a typo or a bug.
