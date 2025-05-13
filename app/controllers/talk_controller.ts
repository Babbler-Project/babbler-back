import type { HttpContext } from '@adonisjs/core/http'
import TalkService from '#services/talk_service'
import { createTalkValidator, updateTalkValidator } from '#validators/talk_validator'

export default class TalkController {
  private service = new TalkService()

  async index({ response }: HttpContext) {
    const talks = await this.service.listAll()
    return response.ok(talks)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTalkValidator)
    try {
      const talk = await this.service.create(payload)
      return response.created(talk)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    const talk = await this.service.findById(params.id)
    if (!talk) return response.notFound({ message: 'Talk not found' })
    return response.ok(talk)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateTalkValidator)
    try {
      const talk = await this.service.update(params.id, payload)
      if (!talk) return response.notFound({ message: 'Talk not found' })
      return response.ok(talk)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const deleted = await this.service.delete(params.id)
    if (!deleted) return response.notFound({ message: 'Talk not found' })
    return response.noContent()
  }
}
