import { ErrorHandlerService } from '#services/error_handler_service'
import TypeService from '#services/type_service'
import {
  createTypeValidator,
  deleteTypeValidator,
  getOneTypeValidator,
  updateTypeValidator,
} from '#validators/type_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TypesController {
  private readonly errorHandler: ErrorHandlerService

  constructor(private typeService: TypeService) {
    this.errorHandler = new ErrorHandlerService()
  }

  async index({ request, response }: HttpContext) {
    try {
      const types = await this.typeService.getAll()
      return response.status(200).json(types)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch types data')
    }
  }

  async store({ response, request }: HttpContext) {
    try {
      const data = request.all()
      const typeRequestDTO = await createTypeValidator.validate(data)
      const type = await this.typeService.createType(typeRequestDTO.label)
      return response.status(201).json(type)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'create type')
    }
  }

  async show({ response, request, params }: HttpContext) {
    try {
      const data = { params }
      const typeRequestDTO = await getOneTypeValidator.validate(data)
      const type = await this.typeService.getTypeById(typeRequestDTO.params.id)
      return type
    } catch (error) {
      this.errorHandler.handle(error, { response, request }, 'fetch one type data')
    }
  }

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

  async destroy({ request, response, params }: HttpContext) {
    try {
      const data = { params }
      const typeRequestDTO = await deleteTypeValidator.validate(data)
      const type = await this.typeService.deleteType(typeRequestDTO.params.id)
      return response.status(200).json(type)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'delete type')
    }
  }
}
