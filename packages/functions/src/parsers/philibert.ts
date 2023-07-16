import axios from "axios"
import { ResponseData } from "@bgprices-sst/shared/interface";

const baseUrl = 'https://eu1-search.doofinder.com/5/search?hashid=f449cb434a44c266d349556844fbe0a8&query_counter=5&page=1&rpp=30&transformer=basic&query='

export async function query(qs: string): Promise<ResponseData[]> {
  const resp = await axios.get(baseUrl + qs, { headers: {origin: 'https://www.philibertnet.com'} })
  const out: ResponseData[] = []

  for (const item of resp.data.results) {
    const entry = await getEntryInfo(item)
    out.push(entry)
  }

  return out;

}

async function getEntryInfo(item: PhilibertItem): Promise<ResponseData> {
  const info: ResponseData = {
    name: item.title,
    imageUrl: item.image_link,
    price: _getPrice(item),
    available: undefined,
    itemUrl: item.link,
    currency: '€',
  }
  return info
}

function _getPrice(item: PhilibertItem) {
  return item.sale_price || item.price;
}

interface PhilibertItem {
  title: string
  price: number
  sale_price: number
  link: string
  image_link: string
}