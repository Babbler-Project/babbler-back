import type { ErrorHandler, ErrorContext } from '#types/errors'

export class DatabaseErrorHandler implements ErrorHandler {
  canHandle(error: any): boolean {
    return error.code === 'E_ROW_NOT_FOUND' || error.code === '23505'
  }

  handle(error: any, context: ErrorContext): void {
    if (error.code === '23505') {
      context.response.status(409).json({
        error: 'DUPLICATE_ENTRY',
        message: 'This entry already exists',
      })
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      context.response.status(404).json({
        error: 'NOT_FOUND',
        message: 'Resource not found',
      })
    }
  }
}
