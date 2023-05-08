import { NextApiRequest, NextApiResponse } from 'next'
import { getNotionBlocksDataInPage } from 'src/app/api/backend/notion'
import { createApiResponse } from 'src/utils/response'

import { schemaForType } from 'src/utils/zod'
import { z } from 'zod'

export type NotionBlocksGetQueryParams = {
  pageId: string
}

export const notionBlockGetQueryParamsSchema =
  schemaForType<NotionBlocksGetQueryParams>()(z.object({ pageId: z.string() }))

export default async function notionBlockApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    // NotionのpageIdに紐づいた全てのブロックを取得する
    const query = notionBlockGetQueryParamsSchema.safeParse(req.query)
    if (query.success === false) {
      return createApiResponse(res).badRequest('invalid params')
    }
    const { pageId } = query.data
    try {
      const blocks = await getNotionBlocksDataInPage(pageId)
      return createApiResponse(res).success(blocks)
    } catch (err) {
      return createApiResponse(res).internalServerError(`${err}`)
    }
  }

  // メソッドが存在しない時
  return createApiResponse(res).notFound('not found')
}
