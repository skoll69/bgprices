import axios from "axios"
import * as cheerio from 'cheerio';
import { ResponseData } from "@bgprices-sst/shared/interface";

const baseUrl = 'https://www.fantasiapelit.com/index.php?main=ai&mista=*&avaa_suodin=1&on_luokka=lautapeli%2Fseurapeli&etsittava='

export async function query(qs: string): Promise<ResponseData[]> {
  const resp = await axios.get(baseUrl + qs)
  const $ = cheerio.load(resp.data)
  const out: ResponseData[] = []
  for (const item of $('.centruutu')) {
    const entry = await getEntryInfo($(item))
    out.push(entry)
  }
  return out;
}

async function getEntryInfo(el: cheerio.Cheerio): Promise<ResponseData> {
  const info: ResponseData = {
    name: el.find('.selausruutunimi').text(),
    imageUrl: 'https://fantasiapelit.com/' + el.find('img').attr('src'),
    price: getPrice(el),
    itemUrl: 'https://fantasiapelit.com/' + el.children().first().children().eq(1).attr('href'),
    available: getAvailability(el),
    currency: "€",
  }
  return info
}

function getPrice(el: cheerio.Cheerio): number {
  let priceEl = el.find('.ruutuhinta').children('.saapalatb')
  let price = priceEl.text()
  price = price.replace('€', '').trim()
  return Number(price)
}

function getAvailability(el: cheerio.Cheerio): boolean {
  let text = el.find('.ruutuhinta').text()
  return text.includes('heti saatavilla')
}

