export const textBlockList = [
  'heading_1',
  'heading_2',
  'heading_3',
  'toggle',
  'callout',
  'quote',
  'paragraph',
]

export const listItemBlockList = [
  'bulleted_list_item',
  'to_do',
  'numbered_list_item',
]

export type TextBlock = typeof textBlockList[number]

export type DecorationBlock = 'divider'

export type ListItemBlock = typeof listItemBlockList[number]

export type BlockType = TextBlock | DecorationBlock | ListItemBlock

export type BlocksObjectSerialized = {
  type: BlockType
  content?: string
}
