// Error Codes
const ERROR_CODES = {
  BOOK_NOT_FOUND: "BOOK_NOT_FOUND",
  DUPLICATE_ISBN: "DUPLICATE_ISBN",
  BOOK_OUT_OF_STOCK: "BOOK_OUT_OF_STOCK",
  INVALID_BOOK_ID: "INVALID_BOOK_ID",
  BOOK_ALREADY_ARCHIVED: "BOOK_ALREADY_ARCHIVED"
}

// Success / Info Messages
const SUCCESS_MESSAGES = {
  BOOK_CREATED: "Book has been created successfully.",
  BOOK_UPDATED: "Book details updated successfully.",
  BOOK_DELETED: "Book deleted successfully.",
  BOOK_RETRIEVED: "Book retrieved successfully.",
  BOOK_LIST_RETRIEVED: "Books list retrieved successfully.",
  BOOK_ISSUED: "Book has been issued successfully.",
  BOOK_RETURNED: "Book returned successfully.",
  BOOK_RESERVED: "Book reserved successfully."
}

// Optional: HTTP Status mapping
const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

module.exports = {
  ERROR_CODES,
  SUCCESS_MESSAGES,
  HTTP_STATUS
}