import { query as fantasiapelit } from "../src/parsers/fantasiapelit";
import { query as lautapelit } from "../src/parsers/lautapelit";

xdescribe('Integration', () => {
  test('Fantasiapelit', async () => {
    const qs = 'dungeon%20lords'
    const res = await fantasiapelit(qs)

    const item = res[0]
    expect(item).toHaveProperty('name')
    expect(item).toHaveProperty('imageUrl')
    expect(item).toHaveProperty('price')
    expect(item).toHaveProperty('available')
    expect(item).toHaveProperty('itemUrl')
    expect(item).toHaveProperty('currency')
  })

  test('Lautapelit', async () => {
    const qs = 'dungeon'
    const res = await lautapelit(qs)

    const item = res[0]
    expect(item).toHaveProperty('name')
    expect(item).toHaveProperty('imageUrl')
    expect(item).toHaveProperty('price')
    expect(item).toHaveProperty('available')
    expect(item).toHaveProperty('itemUrl')
    expect(item).toHaveProperty('currency')
  })
})
