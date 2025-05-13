import type { HttpContext } from '@adonisjs/core/http'
import Talk from '#models/talk'
import User from '#models/user' // Import du modèle User
import { createTalkValidator, updateTalkValidator } from '#validators/talk_validator'

export default class TalkController {
  /**
   * GET /talks
   * Liste tous les talks
   */
  async index({ response }: HttpContext) {
    const talks = await Talk.query().preload('status').preload('level').preload('user')
    return response.ok(talks)
  }

  /**
   * POST /talks
   * Crée un nouveau talk
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTalkValidator)

    // Vérifier si l'utilisateur (speaker) existe
    const speaker = await User.find(payload.speaker)
    if (!speaker) {
      return response.badRequest({ message: 'Speaker not found' })
    }

    // Convertir duration en DateTime si nécessaire
    const { DateTime } = await import('luxon')

    // Vérifier et convertir la durée
    let talkDuration
    try {
      talkDuration = DateTime.fromISO(payload.duration) // Utilisation de `fromISO` qui gère bien le format ISO 8601
      if (!talkDuration.isValid) {
        return response.badRequest({ message: 'Invalid duration format' })
      }
    } catch (error) {
      return response.badRequest({ message: 'Invalid duration format' })
    }

    // Créer la conférence (Talk)
    const talk = await Talk.create({
      ...payload,
      duration: talkDuration, // Utiliser la date validée et convertie
    })
    await talk.load('status')
    await talk.load('level')
    await talk.load('user')

    return response.created(talk)
  }

  /**
   * GET /talks/:id
   * Affiche un talk spécifique
   */
  async show({ params, response }: HttpContext) {
    const talk = await Talk.find(params.id)

    if (!talk) {
      return response.notFound({ message: 'Talk not found' })
    }

    await talk.load('status')
    await talk.load('level')
    await talk.load('user')

    return response.ok(talk)
  }

  /**
   * PUT /talks/:id
   * Met à jour un talk existant
   */
  async update({ params, request, response }: HttpContext) {
    const talk = await Talk.find(params.id)

    if (!talk) {
      return response.notFound({ message: 'Talk not found' })
    }

    const payload = await request.validateUsing(updateTalkValidator)

    // Vérifier si l'utilisateur (speaker) existe
    const speaker = await User.find(payload.speaker)
    if (!speaker) {
      return response.badRequest({ message: 'Speaker not found' })
    }

    // Convertir duration en DateTime si nécessaire
    const { DateTime } = await import('luxon')
    const mergedPayload = {
      ...payload,
      duration: payload.duration ? DateTime.fromJSDate(new Date(payload.duration)) : undefined,
    }

    talk.merge(mergedPayload)
    await talk.save()
    await talk.load('status')
    await talk.load('level')
    await talk.load('user')

    return response.ok(talk)
  }

  /**
   * DELETE /talks/:id
   * Supprime un talk
   */
  async destroy({ params, response }: HttpContext) {
    const talk = await Talk.find(params.id)

    if (!talk) {
      return response.notFound({ message: 'Talk not found' })
    }

    await talk.delete()
    return response.noContent()
  }
}
