import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { PageObjectSerialized } from 'src/types/notion/page'

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
    return {
      id: row.id,
      lastEdittedAt: parseDatetimeString(row.last_edited_time),
      title: title,
      emoji: emoji,
      tags: tag,
    }
  })

  return res
}

const parseDatetimeString = (str: string) => {
  const year = str.slice(0, 4)
  const month = str.slice(5, 7)
  const day = str.slice(8, 10)
  const time = str.slice(11, 19)
  const datetime = new Date(`${year}/${month}/${day} ${time}`)
  datetime.setHours(datetime.getHours() + 9)

  return datetime.toLocaleString().slice(0, -3)
}
