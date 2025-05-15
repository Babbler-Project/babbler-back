import Planning from '#models/planning'
import Room from '#models/room'
import Talk from '#models/talk'
import { isLunchOverlap, isMoreThanMaxDuration, isOutOfOpeningHours } from '#utils/planning_utils'

export default class PlanningService {
  public async getPlanningDuringPeriod(planning: Planning): Promise<Planning[]> {
    return Planning.query()
      .where('start_time', '>=', planning.startTime.toString()) // Luxon -> SQL format
      .andWhere('end_time', '<=', planning.endTime.toString())
      .preload('talk')
      .preload('room')
  }

  public async createPlanning(
    planning: Planning,
    roomId: number,
    talkId: number
  ): Promise<Planning> {
    planning.countPlaces = 0
    planning.isFull = false

    const talk = await Talk.findOrFail(talkId)
    const room = await Room.findOrFail(roomId)
    planning.talkId = talk.id
    planning.roomId = room.id

    await this.verifyPlanningOverlap(planning)

    await planning.save()

    await planning.load((loader) => {
      loader.preload('room').preload('talk')
    })

    return planning
  }

  protected async verifyPlanningOverlap(planning: Planning) {
    const start = planning.startTime
    const end = planning.endTime
    // Verify planning is between 9:00 and 19:00
    if (isOutOfOpeningHours(start, end)) {
      throw new Error('Can not plan outside 9:00 to 19:00')
    }

    if (isLunchOverlap(start, end)) {
      throw new Error('Cannot overlap lunch break (12:00 to 13:00)')
    }

    if (isMoreThanMaxDuration(start, end)) {
      throw new Error('Cannot exceed a duration of 3 hours')
    }

    // Verify overlap
    const overlapPlanning = await Planning.query()
      .where('room_id', planning.roomId)
      .where((query) => {
        query
          .whereBetween('start_time', [start.toString(), end.toString()])
          .orWhereBetween('end_time', [start.toString(), end.toString()])
          .orWhere((q) => {
            q.where('start_time', '<=', start.toString()).andWhere('end_time', '>=', end.toString())
          })
      })
      .first()

    if (overlapPlanning) {
      throw new Error('Can not overlap another planned talk')
    }
  }
}
