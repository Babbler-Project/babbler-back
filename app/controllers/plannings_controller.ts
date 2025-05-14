import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { ErrorHandlerService } from '#services/error_handler_service'
import { createPlanningValidator, getPlanningDuringPeriod } from '#validators/planning_validator'
import { CreatePlanningRequestDTO, GetPlanningDuringPeriodRequestDTO } from '#types/planning_types'
import PlanningMapper from '#mappers/planning_mapper'
import PlanningService from '#services/planning_service'

@inject()
export default class PlaningController {
  private readonly errorHandler: ErrorHandlerService

  constructor(private planningService: PlanningService) {
    this.errorHandler = new ErrorHandlerService()
  }

  async index({ request, response }: HttpContext) {
    try {
      console.log('Fetching planning data')
      const data = { queries: request.qs() }
      const planningRequestDTO: GetPlanningDuringPeriodRequestDTO =
        await getPlanningDuringPeriod.validate(data)
      const planningData = PlanningMapper.fromPlanningDuringPeriodRequestDTO(planningRequestDTO)
      const plannings = await this.planningService.getPlanningDuringPeriod(planningData)
      return response.ok(plannings)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch talk data')
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const requestDTO: CreatePlanningRequestDTO = await createPlanningValidator.validate(data)
      const planningData = PlanningMapper.fromCreateDTO(requestDTO)

      const planning = await this.planningService.createPlanning(
        planningData,
        requestDTO.roomId,
        requestDTO.talkId
      )
      return response.created(planning)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'create talk')
    }
  }
}
