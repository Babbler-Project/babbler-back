import type { Request, Response } from '@adonisjs/core/http'

export interface ErrorContext {
  request: Request
  response: Response
}

export interface ErrorHandler {
  canHandle(error: unknown): boolean
  handle(error: Error, context: ErrorContext): void
}

export interface DatabaseError extends Error {
  code?: string
  status?: number
  message: string
}
