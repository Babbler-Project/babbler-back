import type { ErrorHandler, ErrorContext, DatabaseError } from '#types/errors_types'
import { errors } from '@adonisjs/lucid'

export class DatabaseErrorHandler implements ErrorHandler {
  canHandle(error: DatabaseError): boolean {
    return error instanceof errors.E_ROW_NOT_FOUND || error.code === '23505'
  }

  handle(error: DatabaseError, context: ErrorContext): void {
    if (error.code === '23505') {
      context.response.status(409).json({
        error: 'DUPLICATE_ENTRY',
        message: 'This entry already exists',
      })
      return
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      context.response.status(404).json({
        error: 'NOT_FOUND',
        message: 'Resource not found',
      })
      return
    }
  }
}
