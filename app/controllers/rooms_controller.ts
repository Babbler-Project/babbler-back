import { ErrorHandlerService } from '#services/error_handler_service'
import RoomService from '#services/room_service'
import { RoomDTO } from '#types/room_types'
import {
  createRoomValidator,
  deleteRoomValidator,
  getOneRoomValidator,
  updateRoomValidator,
} from '#validators/room_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RoomsController {
  private readonly errorHandler: ErrorHandlerService

  constructor(private roomService: RoomService) {
    this.errorHandler = new ErrorHandlerService()
  }

  async index({ request, response }: HttpContext) {
    try {
      const rooms = await this.roomService.getAll()
      return response.ok(rooms)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch rooms data')
    }
  }

  async store({ response, request }: HttpContext) {
    try {
      const data = request.all()
      const roomDTO: RoomDTO = await createRoomValidator.validate(data)
      const room = await this.roomService.createRoom(roomDTO)
      return response.created(room)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'create room')
    }
  }

  async show({ response, request, params }: HttpContext) {
    try {
      const data = { params }
      const roomRequestDTO = await getOneRoomValidator.validate(data)
      const room = await this.roomService.getRoomById(roomRequestDTO.params.id)
      return response.ok(room)
    } catch (error) {
      this.errorHandler.handle(error, { response, request }, 'fetch one room data')
    }
  }

  async update({ request, response, params }: HttpContext) {
    try {
      const data = { body: { ...request.all() }, params }
      const roomRequestDTO = await updateRoomValidator.validate(data)
      const room = await this.roomService.updateRoom(roomRequestDTO.params.id, roomRequestDTO.body)
      return response.ok(room)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'update room')
    }
  }

  async destroy({ request, response, params }: HttpContext) {
    try {
      const data = { params }
      const roomRequestDTO = await deleteRoomValidator.validate(data)
      const type = await this.roomService.deleteRoom(roomRequestDTO.params.id)
      return response.ok(type)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'delete room')
    }
  }
}
