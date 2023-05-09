import { Client } from '@notionhq/client'
import { BlockChildrenResponse, QueryDatabaseResponse } from '../types'
import { genNotionBlock } from '../utils/notionBlock'
import { genNotionPage } from '../utils/notionPage'

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

// NotionからDB内の全ページを取得
export const getNotionPagesData = async (databaseId: string) => {
  const res: QueryDatabaseResponse = (await notion.databases.query({
    database_id: databaseId,
  })) as QueryDatabaseResponse

  const result = genNotionPage(res.results)
  return result
}

// NotionからPage内の全ブロックを取得
export const getNotionAllBlock = async (pageId: string) => {
  let allBlocks: Block[] = []

  const flag = true
  while (flag) {
    const res: BlockChildrenResponse = (await getNotionBlockData(
      pageId
    )) as BlockChildrenResponse
    const blocks = await genNotionBlock(res.results)

    allBlocks = allBlocks.concat(blocks)

    if (!res.has_more) {
      break
    }

    for (let i = 0; i < allBlocks.length; i++) {
      const block = allBlocks[i]

      if (
        block.type === 'bulleted_list_item' &&
        block.hasChildren &&
        block.bulletedListItem
      ) {
        block.bulletedListItem.children = await getNotionAllBlock(block.id)
      } else if (
        block.type === 'numbered_list_item' &&
        block.hasChildren &&
        block.numberedListItem
      ) {
        block.numberedListItem.children = await getNotionAllBlock(block.id)
      } else if (block.type === 'to_do' && block.hasChildren && block.toDo) {
        block.toDo.children = await getNotionAllBlock(block.id)
      } else if (block.type === 'toggle' && block.hasChildren && block.toggle) {
        block.toggle.children = await getNotionAllBlock(block.id)
      } else if (
        block.type === 'paragraph' &&
        block.hasChildren &&
        block.paragraph
      ) {
        block.paragraph.children = await getNotionAllBlock(block.id)
      } else if (
        block.type === 'heading_1' &&
        block.hasChildren &&
        block.heading1
      ) {
        block.heading1.children = await getNotionAllBlock(block.id)
      } else if (
        block.type === 'heading_2' &&
        block.hasChildren &&
        block.heading2
      ) {
        block.heading2.children = await getNotionAllBlock(block.id)
      } else if (
        block.type === 'heading_3' &&
        block.hasChildren &&
        block.heading3
      ) {
        block.heading3.children = await getNotionAllBlock(block.id)
      } else if (block.type === 'quote' && block.hasChildren && block.quote) {
        block.quote.children = await getNotionAllBlock(block.id)
      } else if (
        block.type === 'callout' &&
        block.hasChildren &&
        block.callout
      ) {
        block.callout.children = await getNotionAllBlock(block.id)
      }
    }
  }

  return allBlocks
}

export const getNotionBlockData = async (blockId: string) => {
  const res = await notion.blocks.children.list({ block_id: blockId })
  return res
}
