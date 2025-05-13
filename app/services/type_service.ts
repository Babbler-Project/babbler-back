import Type from '#models/type'

export default class TypeService {
  async getAll(): Promise<Type[]> {
    return await Type.all()
  }

  async createType(label: string): Promise<Type> {
    const type = new Type()
    type.label = label
    return await type.save()
  }

  async updateType(id: number, label: string): Promise<Type> {
    const type = await Type.findOrFail(id)
    type.label = label
    return await type.save()
  }
}
