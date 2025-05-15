import Planning from '#models/planning'
import Room from '#models/room'
import Talk from '#models/talk'

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
    await planning.related('talk').associate(talk)
    await planning.related('room').associate(room)

    return await planning.save()
  }
}
