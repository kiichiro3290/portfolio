import { z } from 'zod'
import { schemaForType } from '../../utils/zod'

export type NotionPagesGetQueryParams = {
  databaseId: string
}

export type NotionPagesPostQueryParams = {
  databaseId: string
}

export const notionPagesGetQueryParamsSchema =
  schemaForType<NotionPagesGetQueryParams>()(
    z.object({ databaseId: z.string() })
  )

export const notionPagesPostQueryParamsSchema =
  schemaForType<NotionPagesPostQueryParams>()(
    z.object({ databaseId: z.string() })
  )
