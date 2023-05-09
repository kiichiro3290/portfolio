import { SuccessResponse } from '../../../utils/response'
import { client } from '..'
import { NotionPagesGetQueryParams } from '../../schema/page'
import { NotionBlocksGetQueryParams } from '../../schema/block'

export const notionApi = {
  addPageToDb: async (text: string) => {
    await client().post('/notion/page', text)
  },
  getPages: async (params: NotionPagesGetQueryParams) => {
    const result = await client()
      .get<SuccessResponse<Page[]>>('/notion/page', {
        params,
      })
      .then((res) => {
        return res.data
      })

    return result.data
  },
  getBlocks: async (params: NotionBlocksGetQueryParams) => {
    const result = await client()
      .get<SuccessResponse<Block[]>>('/notion/block', {
        params,
      })
      .then((res) => res.data)
    return result.data
  },
}
