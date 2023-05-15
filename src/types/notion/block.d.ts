type OgpData = {
  pageUrl: string // ページのURLそのもの
  title: string // ページタイトル
  description: string // ページの説明
  faviconUrl: string // ファビコンのURL
  ogpImgUrl: string // OGP画像のURL
}

type Block = {
  id: string
  type: string
  hasChildren: boolean

  paragraph?: Paragraph
  heading1?: Heading1
  heading2?: Heading2
  heading3?: Heading3
  bulletedListItem?: BulletedListItem
  numberedListItem?: NumberedListItem
  toDo?: ToDo
  image?: Image
  code?: Code
  quote?: Quote
  callout?: Callout
  toggle?: Toggle
  bookmark?: Bookmark
  linkPreview?: LinkPreview
  columnList?: ColumnList
  tableOfContents?: TableOfContents
}

type Paragraph = {
  richTexts: RichText[]
  color: string
  children?: Block[]
}

type Heading1 = {
  richTexts: RichText[]
  color: string
  isToggleable: boolean
  children?: Block[]
}

type Heading2 = {
  richTexts: RichText[]
  color: string
  isToggleable: boolean
  children?: Block[]
}

type Heading3 = {
  richTexts: RichText[]
  color: string
  isToggleable: boolean
  children?: Block[]
}

type BulletedListItem = {
  richTexts: RichText[]
  color: string
  children?: Block[]
}

type NumberedListItem = {
  richTexts: RichText[]
  color: string
  children?: Block[]
}

type ToDo = {
  richTexts: RichText[]
  checked: boolean
  color: string
  children?: Block[]
}

type Image = {
  caption: RichText[]
  type: string
  file?: FileImage
  external?: External
  width?: number
  height?: number
}

type FileImage = {
  url: string
  expiryTime?: string
}

type External = {
  url: string
}

type Code = {
  caption: RichText[]
  richTexts: RichText[]
  language: string
}

type Quote = {
  richTexts: RichText[]
  color: string
  children?: Block[]
}

type Equation = {
  expression: string
}

type Callout = {
  richTexts: RichText[]
  icon: Icon
  color: string
  children?: Block[]
}

type Toggle = {
  richTexts: RichText[]
  color: string
  children: Block[]
}

type Bookmark = {
  url: string
  ogp?: OgpData
}

type LinkPreview = {
  url: string
}

type ColumnList = {
  columns: Column[]
}

type Column = {
  id: string
  type: string
  hasChildren: boolean
  children: Block[]
}

type TableOfContents = {
  color: string
}

type RichText = {
  text?: PlainText
  annotation: Annotation
  plainText: string
  href?: string
  equation?: Equation
}

type PlainText = {
  content: string
  link?: Link
}

type Icon = {
  emoji: string
}

type Annotation = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

type Link = {
  url: string
}
