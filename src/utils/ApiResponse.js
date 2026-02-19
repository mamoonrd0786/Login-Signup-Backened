// class ApiResponse

class ApiResponse {
    constructor(data = null, statusCode, message = "Success") {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
    }
}

module.exports = { ApiResponse };