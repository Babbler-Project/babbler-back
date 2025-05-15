export class AuthorizationException extends Error {
  constructor(message = "You're not authorized to perform this action") {
    super(message)
    this.name = 'AuthorizationException'
  }
}
