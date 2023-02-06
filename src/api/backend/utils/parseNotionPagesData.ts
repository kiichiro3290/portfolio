import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { PageObjectSerialized } from '../../../component/pages/noteList/noteList'

// NotionAPIを叩いた後にParserが必要
export const parseNotionPagesData = (
  data: PageObjectResponse[]
): PageObjectSerialized[] => {
  // 型の付け方が悪いから変なparseが必要
  const res = data.map((row) => {
    const titleType = row.properties['Name'].type
    const title = (row.properties['Name'] as any)[titleType][0]
      ? ((row.properties['Name'] as any)[titleType][0].plain_text as string)
      : ''
    const iconType = row.icon?.type ?? ''
    const emoji = iconType ? ((row.icon as any)[iconType] as string) : ''
    const tagType = row.properties['Tags'].type
    const tag = (row.properties['Tags'] as any)[tagType][0]
      ? ((row.properties['Tags'] as any)[tagType].map(
          (row: any) => row.name
        ) as string[])
      : ['なし']
    console.log(tag)
    return {
      id: row.id,
      lastEdittedAt: row.last_edited_time,
      title: title,
      emoji: emoji,
      tags: tag,
    }
  })

  return res
}
