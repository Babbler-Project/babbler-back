import { ErrorHandlerService } from '#services/error_handler_service'
import TypeService from '#services/type_service'
import { createTypeValidator } from '#validators/type_validator'
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
      const type = await this.typeService.create(typeDTO.label)
      return response.status(201).json(type)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'create type')
    }
  }

  // /**
  //  * Show individual record
  //  */
  // async show({ params }: HttpContext) {}

  // /**
  //  * Edit individual record
  //  */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
