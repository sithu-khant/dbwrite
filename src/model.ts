import { dbwrite } from "./dbwrite";

export class Model {
  private static databaseId: string;
  private static databaseName: string;

  get databaseId(): string {
    return this.databaseId;
  }
}
