import nock from "nock";
import { query as fantasiapelit } from "../src/parsers/fantasiapelit";
import { query as lautapelit } from "../src/parsers/lautapelit";
const mockResponses = require('./mock_responses')

describe('Unit', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('Lautapelit.fi', async () => {
    const qs = 'wingspan'
    nock('https://lautapelit.fi')
      .get('/search/?q=' + qs)
      .reply(200, mockResponses.RESPONSE_LAUTAPELIT)

    const res = await lautapelit(qs)
    let item = res[0]

    expect(item).toHaveProperty('name', 'Wingspan');
    expect(item).toHaveProperty('imageUrl', 'https://lautapelit.fi/tuotekuvat/520x520/Wingspan_3D.jpg');
    expect(item).toHaveProperty('price', 55);
    expect(item).toHaveProperty('available', true);
    expect(item).toHaveProperty('itemUrl', 'https://lautapelit.fi/searchproduct/36885/wingspan');
    expect(item).toHaveProperty('currency', '€');
    
    item = res[1]
    expect(item).toHaveProperty('name', 'Wingspan European exp (ENG)');
    expect(item).toHaveProperty('imageUrl', 'https://lautapelit.fi/tuotekuvat/520x520/2014_eikuvaa3.jpg');
    expect(item).toHaveProperty('available', false);
    expect(item).toHaveProperty('itemUrl', 'https://lautapelit.fi/searchproduct/31999/wingspan');
})

  test('Fantasiapelit', async () => {
    const qs = 'dungeon%20lords'
    nock('https://www.fantasiapelit.com')
      .get('/index.php?main=ai&mista=*&avaa_suodin=1&on_luokka=lautapeli%2Fseurapeli&etsittava=' + qs)
      .reply(200, mockResponses.RESPONSE_FANTASIAPELIT)

    const res = await fantasiapelit(qs)
    let item = res[0]
    expect(item.name).toBe('Dungeon Lords');
    expect(item.imageUrl).toBe('https://fantasiapelit.com/pikkukuva.php?xy=1&img=larg9/165665.jpg');
    expect(item.price).toBe(50);
    expect(item.available).toBe(true);
    expect(item.itemUrl).toBe('https://fantasiapelit.com/index.php?main=ai&kat=single&mista=indeksi&etsittava=_165665');
    expect(item.currency).toBe('€');

    item = res[1]
    expect(item.available).toBe(false);
  })
})
