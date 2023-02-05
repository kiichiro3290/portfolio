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
  const parseAsync = async () =>
    data.map((row) => {
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
        if (row.has_children) {
          // ネストされた要素を全取得する
          const blockId = row.id
          const data = getNotionBlocksData(blockId).then((data) => {
            parseNotionBlocksData(data.results as BlockObjectResponse[]).then(
              (data) => {
                console.log(data)
                return {
                  type,
                  content,
                  children: data,
                }
              }
            )
          })

          console.log(data)
          return {
            type,
            content,
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
        const caption = row[type].caption[0] ?? ''
        const divider = '```'
        const content = `${divider}${language} \n${
          (row[type].rich_text[0] as any).plain_text
        }\n${divider}`

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

  const res = await parseAsync()

  return res
}
