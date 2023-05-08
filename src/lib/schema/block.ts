import { z } from 'zod'
import { schemaForType } from '../../utils/zod'

export type NotionBlocksGetQueryParams = {
  pageId: string
}

export const notionBlockGetQueryParamsSchema =
  schemaForType<NotionBlocksGetQueryParams>()(z.object({ pageId: z.string() }))
