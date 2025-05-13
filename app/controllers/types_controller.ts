import { ErrorHandlerService } from '#services/error_handler_service'
import TypeService from '#services/type_service'
import { createTypeValidator, updateTypeValidator } from '#validators/type_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TypesController {
  private readonly errorHandler: ErrorHandlerService

  constructor(private typeService: TypeService) {
    this.errorHandler = new ErrorHandlerService()
  }
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    try {
      const types = await this.typeService.getAll()
      return response.status(200).json(types)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch types data')
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ response, request }: HttpContext) {
    try {
      const data = request.all()
      const typeDTO = await createTypeValidator.validate(data)
      const type = await this.typeService.createType(typeDTO.label)
      return response.status(201).json(type)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'create type')
    }
  }

  // /**
  //  * Show individual record
  //  */
  // async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    try {
      const data = { ...request.all(), params }
      const typeRequestDTO = await updateTypeValidator.validate(data)
      const type = await this.typeService.updateType(typeRequestDTO.params.id, typeRequestDTO.label)
      return response.status(200).json(type)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'update type')
    }
  }

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
