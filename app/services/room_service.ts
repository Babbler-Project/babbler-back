import Room from '#models/room'
import { RoomDTO } from '#types/room_types'

export default class RoomService {
  async getAll(): Promise<Room[]> {
    return await Room.all()
  }

  async getRoomById(id: number): Promise<Room> {
    return await Room.findOrFail(id)
  }

  async createRoom(roomDto: RoomDTO): Promise<Room> {
    return await Room.create(roomDto)
  }

  async updateRoom(id: number, roomDto: RoomDTO): Promise<Room> {
    const room = await Room.findOrFail(id)
    return await room.merge(roomDto).save()
  }

  async deleteRoom(id: number): Promise<Room> {
    const room = await Room.findOrFail(id)
    await room.delete()
    return room
  }
}
