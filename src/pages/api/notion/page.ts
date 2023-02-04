import { NextApiRequest, NextApiResponse } from 'next'
import { getNotionPagesData, addPageNotionDb } from '~/api/backend/notion'

import { z } from 'zod'
import { schemaForType } from '~/utils/zod'
import { createApiResponse } from '~/api/backend/response'

export type NotionPagesGetQueryParams = {
  databaseId: string
}

export type NotionPagesPostQueryParams = {
  databaseId: string
}

const notionPagesGetQueryParamsSchema =
  schemaForType<NotionPagesGetQueryParams>()(
    z.object({ databaseId: z.string() })
  )

const notionPagesPostQueryParamsSchema =
  schemaForType<NotionPagesPostQueryParams>()(
    z.object({ databaseId: z.string() })
  )

export const notionPageApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method == 'GET') {
    // Notionのデータベースに紐づいた全てのページを取得する
    const query = notionPagesGetQueryParamsSchema.safeParse(req.query)
    if (query.success === false) {
      return createApiResponse(res).badRequest('invalid params')
    }
    const { databaseId } = query.data
    try {
      const pages = await getNotionPagesData(databaseId)
      return createApiResponse(res).success(pages)
    } catch (err) {
      return createApiResponse(res).internalServerError(`${err}`)
    }
  }
  if (req.method == 'POST') {
    // データベースにページを投稿する
    const query = notionPagesPostQueryParamsSchema.safeParse(req.query)
    if (query.success === false) {
      return createApiResponse(res).badRequest('invalid params')
    }
    const { databaseId } = query.data
    try {
      await addPageNotionDb(databaseId)
    } catch (err) {
      return createApiResponse(res).internalServerError(`${err}`)
    }
  }

  // メソッドが存在しない時
  return createApiResponse(res).notFound()
}
