export function jsonResponse(body: object, statusCode = 200) {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}
