import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import {
  BlocksObjectSerialized,
  textBlockList,
  listItemBlockList,
} from '~/types/notion/block'
import { getNotionBlocksData } from '../notion'

// NotionAPIを叩いた後にParserが必要
export const parseNotionBlocksData = async (
  data: Array<BlockObjectResponse>
): Promise<BlocksObjectSerialized[]> => {
  // 型の付け方が悪いから変なparseが必要
  const res = await Promise.all(
    data.map(async (row) => {
      const type = row.type
      const decorationBlockList = ['divider']
      const tableBlock = 'table'
      const codeBlock = 'code'
      const bookmarkBlock = 'bookmark'
      const tableOfContentsBlock = 'table_of_contents'
      const imgBlock = 'image'

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
        if (row.has_children) {
          // ネストされた要素を全取得する
          const blockId = row.id
          const res = await getNotionBlocksData(blockId)
          const children = await parseNotionBlocksData(
            res.results as BlockObjectResponse[]
          )
          return {
            type,
            content,
            children,
          }
        }

        return {
          type,
          content,
        }
      }

      if (codeBlock == type) {
        // コードはキャプションとかプログラミング言語の情報を持っている
        const language = row[type].language
        const caption = row[type].caption[0]
          ? row[type].caption[0].plain_text
          : ''

        const divider = '```'

        const content = `${divider}${language}:${caption} \n${
          (row[type].rich_text[0] as any).plain_text
        } \n${divider}`

        return {
          type,
          content,
        }
      }

      if (imgBlock == type) {
        const imgType = row[type].type
        if (imgType == 'external') {
          return {
            type,
          }
        }
        if (imgType == 'file') {
          const url = (row[type] as any)[imgType].url
          return {
            type,
            content: url,
          }
        }
      }

      if (tableOfContentsBlock == type) {
        const content = ''

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
  )

  return res
}
