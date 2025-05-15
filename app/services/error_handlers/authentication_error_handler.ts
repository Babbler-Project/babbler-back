import type { ErrorHandler, ErrorContext } from '#types/errors_types'
import { errors } from '@adonisjs/auth'

export class AuthenticationErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return error instanceof errors.E_UNAUTHORIZED_ACCESS
  }

  handle(_error: Error, context: ErrorContext): void {
    context.response.unauthorized({
      error: 'UNAUTHORIZED',
      message: 'Authentication required',
    })
  }
}
