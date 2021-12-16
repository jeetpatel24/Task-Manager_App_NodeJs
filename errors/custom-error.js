class CustomAPIError extends Error {
    constructor(error, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomError = (errMsg, statusCode) => {
    new CustomAPIError(errMsg, statusCode);
}

module.exports = {createCustomError, CustomAPIError};