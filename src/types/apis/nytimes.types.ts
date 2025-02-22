import { IApiError } from '../base.types'

interface INYTimesMultimedia {
  url: string
  format: string
  height: number
  width: number
  type: string
  subtype: string
  caption: string
  credit: string
}

interface INYTimesArticle {
  _id: string
  abstract: string
  web_url: string
  snippet: string
  lead_paragraph: string
  print_section: string
  print_page: string
  source: string
  multimedia: INYTimesMultimedia[]
  headline: {
    main: string
    kicker: string | null
    content_kicker: string | null
    print_headline: string | null
    name: string | null
    seo: string | null
    sub: string | null
  }
  pub_date: string
  document_type: string
  news_desk: string
  section_name: string
  type_of_material: string
  word_count: number
}

export interface INYTimesResponse {
  status: string
  copyright: string
  response: {
    docs: INYTimesArticle[]
    meta: {
      hits: number
      offset: number
      time: number
    }
  }
}

export interface INYTimesApiError extends IApiError {
  fault: {
    faultstring: string
    detail: {
      errorcode: string
    }
  }
}

export interface INYTimesApiParams {
  q?: string
  page?: number
  sort?: string
  begin_date?: string
  end_date?: string
  facet?: boolean
  facet_fields?: string[]
  facet_filter?: boolean
  fq?: string
}
