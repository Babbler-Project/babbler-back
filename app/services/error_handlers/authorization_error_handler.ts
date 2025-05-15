import type { ErrorContext, ErrorHandler } from '#types/errors_types'
import { AuthorizationException } from '#exceptions/authorization_exeption'

export class AuthorizationErrorHandler implements ErrorHandler {
  public canHandle(error: unknown): boolean {
    return error instanceof AuthorizationException
  }

  public handle(error: Error, context: ErrorContext): void {
    context.response.forbidden({
      error: 'FORBIDDEN',
      message: error.message || "You're not allowed to perform this action",
    })
  }
}
