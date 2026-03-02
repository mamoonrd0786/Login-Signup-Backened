// class ApiResponse

class ApiResponse {
    constructor(accessToken = null, data = null, statusCode, message = "Success") {
        this.accessToken = accessToken;
        this.data = [data];
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
    }
}

module.exports = { ApiResponse };