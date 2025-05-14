import Room from '#models/room'

export async function createRoom(data?: Partial<Room>) {
  return await Room.create({
    name: data?.name ?? 'Mocked name',
    capacity: data?.capacity ?? 10,
  })
}

export async function createManyRooms(count: number) {
  const types: Room[] = []
  for (let i = 0; i < count; i++) {
    types.push(await createRoom({ name: `Name ${i + 1}`, capacity: (i + 1) * 10 }))
  }
  return types
}
