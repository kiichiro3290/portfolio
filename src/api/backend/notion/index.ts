import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY })

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? ''

export const addPageNotionDb = async (text: string): Promise<string> => {
  // todo: zod を用いたvalidation
  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      title: {
        title: [
          {
            text: {
              content: text,
            },
          },
        ],
      },
    },
  })
  return 'succeed'
}

// export const getItemNotionDB = async (): Promise<(PageObjectResponse | PartialPageObjectResponse)[]> => {
//   try {
//     const response = await notion.databases.query({ database_id: databaseId })
//     console.log(response.results)
//     return response.results
//   } catch (error) {
//     console.log(error)
//     return []
//   }
// }

// // NotionからPageのデータを取得
// export const getNotionPageData = async (pageId: string) => {
//   try {
//     const response = await notion.blocks.children.list({ block_id: pageId })
//     console.log(response)
//     return response
//   } catch (error) {
//     console.log(error)
//     return
//   }
// }

// NotionからDB内の全ページを取得
export const getNotionPagesData = async (databaseId: string) => {
  const res = await notion.databases.query({ database_id: databaseId })

  // todo: zodを用いたvalidation
  return res
}

// NotionからPage内の全ブロックを取得
export const getNotionBlocksData = async (pageId: string) => {
  const res = await notion.blocks.children.list({ block_id: pageId })

  // todo: zodを用いたvalidation
  return res
}