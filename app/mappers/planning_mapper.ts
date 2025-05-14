import Planning from '#models/planning'
import { CreatePlanningRequestDTO, GetPlanningDuringPeriodRequestDTO } from '#types/planning_types'
import { DateTime } from 'luxon'

export default class PlanningMapper {
  static fromPlanningDuringPeriodRequestDTO(dto: GetPlanningDuringPeriodRequestDTO): Planning {
    const planning = new Planning()
    planning.startTime = DateTime.fromJSDate(new Date(dto.queries.startDate))
    planning.endTime = DateTime.fromJSDate(new Date(dto.queries.endDate))
    return planning
  }

  static fromCreateDTO(dto: CreatePlanningRequestDTO): Planning {
    const planning = new Planning()
    planning.startTime = DateTime.fromJSDate(dto.startDateTime)
    planning.endTime = DateTime.fromJSDate(dto.endDateTime)
    // planning.countPlaces = 0
    // planning.isFull = false
    return planning
  }
}
