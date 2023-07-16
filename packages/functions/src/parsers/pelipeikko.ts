import axios from "axios"
import { ResponseData } from "@bgprices-sst/shared/interface";

const baseUrl = 'https://pelipeikko.fi/fi/search?s='

export async function query(qs: string): Promise<ResponseData[]> {
  const resp = await axios.get(baseUrl + qs)
  const out: ResponseData[] = []

  for (const item of resp.data.products) {
    const entry = await getEntryInfo(item)
    out.push(entry)
  }

  return out;
}

async function getEntryInfo(item: PelipeikkoItem): Promise<ResponseData> {
  const info: ResponseData = {
    name: item.name,
    imageUrl: item.cover.medium.url,
    price: item.price_amount,
    available: Boolean(item.add_to_cart_url),
    itemUrl: item.url,
    currency: '€',
  }
  return info
}

interface PelipeikkoItem {
  name: string;
  cover: Cover;
  price_amount: number;
  add_to_cart_url: string;
  url: string;
}

interface Cover {
  medium: Medium
}

interface Medium {
  url: string
}