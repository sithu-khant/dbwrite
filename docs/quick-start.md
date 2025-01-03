# Quick Start

WIP

## Installation

```bash
bun add dbwrite
```

(or)

```bash
npm i dbwrite
```

## Appwrite API

Has access to

- `Database` scope permission.

## Codes

```js
const NoteDB = new Database(databaseId, databaseName);

const NoteSchema = new Schema({});

const NoteModel = new Model(NoteDB, collectionId, collectionName, NoteSchema);
```
