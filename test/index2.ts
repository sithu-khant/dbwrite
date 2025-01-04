import { Database, Model, Schema, dbwrite } from "dbwrite";

// Connect to Appwrite
dbwrite.connect(
  process.env.APPWRITE_ENDPOINT!,
  process.env.APPWRITE_PROJECT!,
  process.env.APPWRITE_KEY!
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
