export type QueryDatabaseResponse = {
  object: string
  results: PageObject[]
  next_cursor: null | string
  has_more: boolean
  type: string
  page?: Record<string, never>
}

export type BlockChildrenResponse = {
  object: string
  results: BlockObject[]
  next_cursor: null | string
  has_more: boolean
  type: string
  block?: Record<string, never>
}

export type PageObject = {
  object: string
  id: string
  created_time: string
  created_by: UserObject
  last_edited_time: string
  last_edited_by: UserObject
  archived: boolean
  icon: Emoji // Notion絵文字Only
  cover: Cover
  properties: PageProperties
  parent: Parent
  url: string
}

export type PageProperties = {
  [key: string]: PageProperty
}

export type PageProperty = {
  id: string
  type: string

  // プロパティ
  title?: RichTextObject[]
  rich_text?: RichTextObject[]

  // その他色々プロパティ
}

// User Object
export type UserObject = {
  object: string
  id: string
}

export type FileObject = {
  type: string
  name?: string
  external?: External
  file?: File
}

export type File = {
  url: string
  expiry_time: string
}

export type External = {
  type: string
  emoji: string
}

export type Emoji = {
  type: string
  emoji: string
}

export type Parent = {
  type: string

  database_id?: string
  page_id?: string
}

export type RichTextObject = {
  type: string
  plain_text: string
  annotations: Annotation
  href?: string

  text?: Text
  mention?: Mention
  equation?: Equation
}

export type Annotation = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

export type Text = {
  content: string
  link?: Link
}

export type Link = {
  url: string
}

export type Mention = {
  type: string

  user?: UserObject
  page?: Reference
  database?: Reference
  date?: DateProperty
  link_preview?: LinkPreview
}

export type Reference = {
  id: string
}

export type DateProperty = {
  start?: string
  end?: null | string
  timezone?: null | string
}

export type LinkPreview = {
  url: string
}

export type Equation = {
  expression: string
}

export type Cover = {
  type: string
  external?: External
}

// Block Object
// https://developers.notion.com/reference/block
export type BlockObject = {
  object: string
  id: string

  parent: Parent

  created_time: string
  last_edited_time: string
  created_by: UserObject

  hasChildren: boolean
  archived: boolean
  type: string

  paragraph?: Paragraph
  heading_1?: Heading
  heading_2?: Heading
  heading_3?: Heading
  callout?: Callout
  quote?: Quote
  bulleted_list_item?: ListItem
  numbered_list_item?: ListItem
  to_do?: ToDo
  toggle?: Toggle
  code?: Code
  child_page?: ChildPage
  child_database?: ChildDatabase
  embed?: Embed
  image?: FileBlock
  video?: FileBlock
  file?: FileBlock
  pdf?: FileBlock
  bookmark?: Bookmark
  equation?: Equation
  divider?: Record<string, never>
  table_of_contents?: TableOfContents
  breadcrumb?: Record<string, never>
  column_list?: Record<string, never>
  column?: Record<string, never>
  link_preview?: LinkPreview
  template?: Template
  link_to_page?: LinkToPage
  synced_block?: SyncedBlock
  table?: Table
  table_row?: TableRow
}

export type Paragraph = {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

export type Heading = {
  rich_text: RichTextObject[]
  color: string
  is_toggleable: boolean
}

export type Callout = {
  rich_text: RichTextObject[]
  icon: Emoji
  color: string
  children?: BlockObject[]
}

export type Quote = {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

export type ListItem = {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

export type ToDo = {
  rich_text: RichTextObject[]
  checked: boolean
  color: string
  children?: BlockObject[]
}

export type Toggle = {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

export type Code = {
  rich_text: RichTextObject[]
  caption?: RichTextObject[]
  language: string
}

export type ChildPage = {
  title: string
}

export type ChildDatabase = {
  title: string
}

export type Embed = {
  url: string
}

export type FileBlock = {
  type: string
  name?: string
  external?: External
  file?: File
  caption?: RichTextObject[]
}

export type Bookmark = {
  url: string
  caption?: RichTextObject[]
}

export type TableOfContents = {
  rich_text: RichTextObject[]
  children?: BlockObject[]
}

export type Template = {
  rich_text: RichTextObject[]
  children?: BlockObject[]
}

export type LinkToPage = {
  type: string
  page_id?: string
  database_id?: string
}

export type SyncedBlock = {
  synced_from: null | SyncedFrom
  children?: BlockObject[]
}

export type SyncedFrom = {
  type: string
  block_id: string
}

export type Table = {
  table_width: number
  has_column_header: boolean
  has_row_header: boolean
  children?: BlockObject[]
}

export type TableRow = {
  cells: RichTextObject[]
}
