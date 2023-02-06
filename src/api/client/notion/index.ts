import { SuccessResponse } from '~/utils/response'
import { NotionBlocksGetQueryParams } from '~/pages/api/notion/block'
import { NotionPagesGetQueryParams } from '~/pages/api/notion/page'
import { client } from '..'
import { BlocksObjectSerialized } from '~/types/notion/block'
import { PageObjectSerialized } from '~/types/notion/page'

export const notionApi = {
  addPageToDb: async (text: string) => {
    await client().post('/notion/page', text)
  },
  getPages: async (params: NotionPagesGetQueryParams) => {
    const result = await client()
      .get<SuccessResponse<PageObjectSerialized[]>>('/notion/page', {
        params,
      })
      .then((res) => res.data)
    return result.data
  },
  getBlocks: async (params: NotionBlocksGetQueryParams) => {
    const result = await client()
      .get<SuccessResponse<BlocksObjectSerialized[]>>('/notion/block', {
        params,
      })
      .then((res) => res.data)
    return result.data
  },
}
