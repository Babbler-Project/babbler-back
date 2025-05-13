import type { ErrorHandler, ErrorContext } from '#types/errors_types'
import { errors } from '@vinejs/vine'

export class ValidationErrorHandler implements ErrorHandler {
  canHandle(error: unknown): boolean {
    return error instanceof errors.E_VALIDATION_ERROR
  }

  handle(error: Error, context: ErrorContext): void {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      context.response.status(422).json({
        error: 'VALIDATION_ERROR',
        message: 'Erreur de validation des données',
        errors: error.messages, // Les détails spécifiques des erreurs de validation
      })
    }
  }
}
