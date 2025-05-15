import Type from '#models/type'

export async function createType(data?: Partial<Type>) {
  return await Type.create({
    label: data?.label ?? 'Mocked label',
  })
}

export async function createManyTypes(count: number) {
  const types: Type[] = []
  for (let i = 0; i < count; i++) {
    types.push(await createType({ label: `Type ${i + 1}` }))
  }
  return types
}
