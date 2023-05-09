import { PageObject } from '../types'

// NotionAPIを叩いた後にParserが必要
export const genNotionPage = (pageObjects: PageObject[]): Page[] => {
  const res: Page[] = pageObjects.map((pageObject) => {
    const prop = pageObject.properties

    // Tag Propertyの値を取得する
    const tags = (prop['Tags'] as any)[prop['Tags'].type][0]
      ? ((prop['Tags'] as any)[prop['Tags'].type].map(
          (pageObject: any) => pageObject.name
        ) as string[])
      : ['なし']

    // Name Propertyの値を取得する
    const title = (prop['Name'] as any)[prop['Name'].type][0].plain_text
      ? (prop['Name'] as any)[prop['Name'].type][0].plain_text
      : 'タイトル'

    const page: Page = {
      id: pageObject.id,
      lastEditedAt: pageObject.last_edited_time,
      title,
      emoji: pageObject.icon.emoji ?? '',
      tags,
    }
    return page
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
