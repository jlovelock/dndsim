export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class NotFoundException extends HttpException {
  constructor(id?: string) {
    const message = id ? `No entity with id ${id} could be found.` : "The requested entity could not be found."
    super(404, message);
  }
}
