import axios from "axios"
import * as cheerio from 'cheerio';
import { ResponseData } from "@bgprices-sst/shared/interface";

const baseUrl = 'https://lautapelit.fi/search/?q='

export async function query(qs: string): Promise<ResponseData[]> {
  const resp = await axios.get(baseUrl + qs)
  const $ = cheerio.load(resp.data)
  const out: ResponseData[] = []

  let items = $('.SearchResults .ContentSection .Grid .GridList .ListItem .Product')

  for(const item of items) {
    const entry = await getEntryInfo($(item))
    out.push(entry)
  }
  
  return out;
}

async function getEntryInfo(el: cheerio.Cheerio): Promise<ResponseData> {
  return {
      name: el.find('.ProductName').first().text().trim(),
      imageUrl: 'https://lautapelit.fi' + el.find('.ProductImageContainer img').attr('data-src'),
      price: Number(el.find('.ProductPrice').text().trim().slice(0, -5)),
      available: el.hasClass('Available'),
      itemUrl: 'https://lautapelit.fi' + el.find('.ProductImage').attr('href'),
      currency: '€',
  }
}
