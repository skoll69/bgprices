import nock from "nock";
import { query as fantasiapelit } from "../src/parsers/fantasiapelit";
import { query as lautapelit } from "../src/parsers/lautapelit";
import { query as pelipeikko } from "../src/parsers/pelipeikko";
import { query as philibert } from "../src/parsers/philibert";
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
    const qs = 'spirit%20island'
    nock('https://www.fantasiapelit.com')
      .get('/index.php?main=ai&mista=*&avaa_suodin=1&on_luokka=lautapeli%2Fseurapeli&etsittava=' + qs)
      .reply(200, mockResponses.RESPONSE_FANTASIAPELIT)

    const res = await fantasiapelit(qs)
    let item = res[0]
    expect(item.name).toBe('Spirit Island');
    expect(item.imageUrl).toBe('https://fantasiapelit.com/pikkukuva.php?xy=1&img=largd/176579.jpg');
    expect(item.price).toBe(96);
    expect(item.available).toBe(true);
    expect(item.itemUrl).toBe('https://fantasiapelit.com/index.php?main=ai&kat=single&mista=indeksi&etsittava=_176579');
    expect(item.currency).toBe('€');

    item = res[1]
    expect(item.available).toBe(false);
  })

  test('Pelipeikko', async() => {
    let qs = 'spirit%20island'
    nock('https://pelipeikko.fi')
      .get('/fi/search?s=' + qs)
      .reply(200, mockResponses.RESPONSE_PELIPEIKKO)

    const res = await pelipeikko(qs);
  
    const item = res[0];
    expect(item.name).toEqual('Spirit Island');
    expect(item.imageUrl).toEqual('https://pelipeikko.fi/1394-medium_default/spirit-island.jpg');
    expect(item.price).toEqual(69.95);
    expect(item.available).toEqual(false);
    expect(item.itemUrl).toEqual('https://pelipeikko.fi/fi/home/110-spirit-island');
    expect(item.currency).toEqual('€');
  })

  test('Philibert', async() => {
    let qs = 'decrypto'
    nock('https://eu1-search.doofinder.com')
      .get('/5/search?hashid=f449cb434a44c266d349556844fbe0a8&query_counter=5&page=1&rpp=30&transformer=basic&query=' + qs)
      .reply(200, mockResponses.RESPONSE_PHILIBERTNET)
    const res = await philibert(qs)
    const item = res[0]

    expect(item.name).toEqual('Decrypto');
    expect(item.imageUrl).toEqual('https://cdn2.philibertnet.com/390676-medium_default/decrypto.jpg');
    expect(item.price).toEqual(19.9);
    expect(item.available).toEqual(undefined);
    expect(item.itemUrl).toEqual('https://www.philibertnet.com/en/le-scorpion-masque/56970-decrypto-807658000709.html');
    expect(item.currency).toEqual('€');

  })

})
