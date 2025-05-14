import type { HttpContext } from '@adonisjs/core/http'
import TalkService from '#services/talk_service'
import TalkMapper from '#mappers/talk_mapper'
import {
  createTalkValidator,
  deleteTalkValidator,
  getOneTalkValidator,
  refusedTalkValidator,
  updateTalkValidator,
} from '#validators/talk_validator'
import { inject } from '@adonisjs/core'
import { ErrorHandlerService } from '#services/error_handler_service'
import {
  CreateTalkRequestDTO,
  RefusedTalkRequestDTO,
  UpdateTalkRequestDTO,
} from '#types/talk_types'

@inject()
export default class TalkController {
  private readonly errorHandler: ErrorHandlerService

  constructor(private talkService: TalkService) {
    this.errorHandler = new ErrorHandlerService()
  }

  async index({ request, response }: HttpContext) {
    try {
      const talks = await this.talkService.getAll()
      return response.ok(talks)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch talk data')
    }
  }

  async pending({ request, response }: HttpContext) {
    try {
      const talks = await this.talkService.getAllPendingTalks()
      return response.ok(talks)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch pending talks data')
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const requestDTO: CreateTalkRequestDTO = await createTalkValidator.validate(data)
      const talkData = TalkMapper.fromCreateDTO(requestDTO)

      const talk = await this.talkService.createTalk(
        talkData,
        requestDTO.speakerId,
        requestDTO.levelId,
        requestDTO.typeId
      )
      return response.created(talk)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'create talk')
    }
  }

  async show({ params, request, response }: HttpContext) {
    try {
      const data = { params }
      const typeRequestDTO = await getOneTalkValidator.validate(data)
      const talk = await this.talkService.findById(typeRequestDTO.params.id)
      return response.ok(talk)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch one talk data')
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = { body: request.all(), params }
      const requestDTO: UpdateTalkRequestDTO = await updateTalkValidator.validate(data)
      const talkData = TalkMapper.fromUpdateDTO(requestDTO)
      const talk = await this.talkService.updateTalk(
        talkData,
        requestDTO.body.levelId,
        requestDTO.body.typeId
      )
      return response.ok(talk)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'update talk')
    }
  }

  async refused({ params, request, response }: HttpContext) {
    try {
      const data = { body: request.all(), params }
      const requestDTO: RefusedTalkRequestDTO = await refusedTalkValidator.validate(data)
      const talkData = TalkMapper.fromRefusedDTO(requestDTO)
      const talk = await this.talkService.refusedTalk(talkData)
      return response.ok(talk)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'update talk')
    }
  }

  async destroy({ params, request, response }: HttpContext) {
    try {
      const data = { params }
      const typeRequestDTO = await deleteTalkValidator.validate(data)
      const talk = await this.talkService.deleteTalk(typeRequestDTO.params.id)
      return response.ok(talk)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'delete talk')
    }
  }
}
