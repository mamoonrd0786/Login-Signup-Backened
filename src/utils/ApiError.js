class ApiError extends Error{
    constructor(statusCode, message, data = null){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

        super(message);
    }
}

module.exports = ApiError;