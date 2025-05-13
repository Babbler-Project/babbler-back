import Type from '#models/type'

export default class TypeService {
  async getAll(): Promise<Type[]> {
    return await Type.all()
  }
  async getTypeById(id: number): Promise<Type> {
    return await Type.findOrFail(id)
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

  async deleteType(id: number): Promise<Type> {
    const type = await Type.findOrFail(id)
    await type.delete()
    return type
  }
}
