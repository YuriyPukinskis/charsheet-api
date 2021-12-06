class BadDataError extends Error {
  constructor(message) {
    console.log(message)
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadDataError;
