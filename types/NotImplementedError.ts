export class NotImplementedError extends Error {
  constructor() {
    super("The method is not implemented.");
    this.name = "NotImplementedError";
  }
}
