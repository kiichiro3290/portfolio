import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import {
  BlocksObjectSerialized,
  listItemBlockList,
  textBlockList,
} from '../types/notionBlocks'

// NotionAPIを叩いた後にParserが必要
export const parseNotionBlocksData = (
  data: Array<BlockObjectResponse>
): BlocksObjectSerialized[] => {
  // 型の付け方が悪いから変なparseが必要
  const res = data.map((row) => {
    const type = row.type
    const decorationBlockList = ['divider']
    const tableBlock = 'table'
    const codeBlock = 'code'
    const bookmarkBlock = 'bookmark'

    if (textBlockList.includes(type)) {
      const content = (row as any)[type].rich_text[0]
        ? (row as any)[type].rich_text[0].plain_text
        : ''

      return {
        type,
        content,
      }
    }

    if (decorationBlockList.includes(type)) {
      return {
        type,
      }
    }

    if (listItemBlockList.includes(type)) {
      const content = (row as any)[type].rich_text[0].plain_text

      return {
        type,
        content,
      }
    }

    if (codeBlock == type) {
      // コードはキャプションとかプログラミング言語の情報を持っている
      const language = row[type].language
      const caption = row[type].caption[0] ?? ''
      const div = '```'
      const content = `${div}${language} ${
        (row[type].rich_text[0] as any).plain_text
      }${div}`

      return {
        type,
        content,
      }
    }

    if (tableBlock == type) {
      // テーブルはchildrenを持っているのでめちゃくちゃだるい→正直対応したくない
      const content = ''
      return {
        type,
        content,
      }
    }

    if (bookmarkBlock == type) {
      const content = row[type].url

      return {
        type,
        content,
      }
    }

    return {
      type,
    }
  })

  return res
}
