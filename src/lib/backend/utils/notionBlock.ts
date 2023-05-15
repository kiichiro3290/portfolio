import { BlockObject, RichTextObject } from '../types'

// NotionAPIを叩いた後にParserが必要
export const genNotionBlock = async (
  blockObjects: BlockObject[]
): Promise<Block[]> => {
  // 型の付け方が悪いから変なparseが必要
  const res = await Promise.all(
    blockObjects.map(async (blockObject) => {
      const block: Block = {
        id: blockObject.id,
        type: blockObject.type,
        hasChildren: blockObject.hasChildren,
      }

      switch (blockObject.type) {
        case 'paragraph': {
          const richTexts = blockObject.paragraph?.rich_text.map(genRichText)
          if (!richTexts || richTexts.length == 0) break

          const paragraph: Paragraph = {
            richTexts,
            color: blockObject.paragraph?.color ?? '',
          }
          block.paragraph = paragraph
          break
        }

        case 'heading_1': {
          const richTexts = blockObject.heading_1?.rich_text.map(genRichText)
          if (!richTexts || richTexts.length == 0) break

          const heading1: Heading1 = {
            richTexts,
            color: blockObject.heading_1?.color ?? '',
            isToggleable: blockObject.heading_1?.is_toggleable ?? false,
          }

          block.heading1 = heading1
          break
        }

        case 'heading_2': {
          const richTexts = blockObject.heading_2?.rich_text.map(genRichText)
          if (!richTexts || richTexts.length == 0) break

          const heading2: Heading2 = {
            richTexts,
            color: blockObject.heading_2?.color ?? '',
            isToggleable: blockObject.heading_2?.is_toggleable ?? false,
          }

          block.heading2 = heading2
          break
        }

        case 'heading_3': {
          const richTexts = blockObject.heading_3?.rich_text.map(genRichText)
          if (!richTexts || richTexts.length == 0) break

          const heading3: Heading3 = {
            richTexts,
            color: blockObject.heading_3?.color ?? '',
            isToggleable: blockObject.heading_3?.is_toggleable ?? false,
          }

          block.heading3 = heading3
          break
        }

        case 'bulleted_list_item': {
          const richTexts =
            blockObject.bulleted_list_item?.rich_text.map(genRichText)
          if (!richTexts || richTexts.length == 0) break

          const bulletedListItem: BulletedListItem = {
            richTexts,
            color: blockObject.bulleted_list_item?.color ?? '',
          }

          block.bulletedListItem = bulletedListItem
          break
        }

        case 'numbered_list_item': {
          const richTexts =
            blockObject.numbered_list_item?.rich_text.map(genRichText)
          if (!richTexts || richTexts.length == 0) break

          const numberedListItem: NumberedListItem = {
            richTexts,
            color: blockObject.numbered_list_item?.color ?? '',
          }

          block.numberedListItem = numberedListItem
          break
        }

        case 'to_do': {
          const richTexts = blockObject.to_do?.rich_text.map(genRichText)
          if (!richTexts || richTexts.length == 0) break

          const toDo: ToDo = {
            richTexts,
            color: blockObject.to_do?.color ?? '',
            checked: blockObject.to_do?.checked ?? false,
          }

          block.toDo = toDo
          break
        }

        case 'image': {
          const caption = blockObject.image?.caption?.map(genRichText)

          const image: Image = {
            caption: caption ?? [],
            type: blockObject.image?.type ?? '',
            file: blockObject.image?.file,
          }

          block.image = image
          break
        }

        case 'code': {
          const code: Code = {
            caption: blockObject.code?.caption?.map(genRichText) ?? [],
            richTexts: blockObject.code?.rich_text.map(genRichText) ?? [],
            language: blockObject.code?.language ?? '',
          }

          block.code = code
          break
        }

        case 'quote': {
          const quote: Quote = {
            richTexts: blockObject.quote?.rich_text.map(genRichText) ?? [],
            color: blockObject.quote?.color ?? '',
          }

          block.quote = quote
          break
        }

        // todo: equation

        case 'callout': {
          const callout: Callout = {
            richTexts: blockObject.callout?.rich_text.map(genRichText) ?? [],
            icon: {
              emoji: blockObject.callout?.icon.emoji ?? '',
            },
            color: blockObject.callout?.color ?? '',
          }

          block.callout = callout
          break
        }

        // todo: synced Block

        case 'toggle': {
          const toggle: Toggle = {
            richTexts: blockObject.toggle?.rich_text.map(genRichText) ?? [],
            color: blockObject.toggle?.color ?? '',
            children: [],
          }

          block.toggle = toggle
          break
        }

        // todo: embed

        case 'bookmark': {
          const bookmark: Bookmark = {
            url: blockObject.bookmark?.url ?? '',
          }

          block.bookmark = bookmark
          break
        }

        // todo: link preview
        // todo: table
        // todo: column list
      }
      return block
    })
  )

  return res
}

const genRichText = (richTextObject: RichTextObject): RichText => {
  const annotation: Annotation = {
    bold: richTextObject.annotations.bold,
    italic: richTextObject.annotations.italic,
    strikethrough: richTextObject.annotations.strikethrough,
    underline: richTextObject.annotations.underline,
    code: richTextObject.annotations.code,
    color: richTextObject.annotations.color,
  }

  const richText: RichText = {
    annotation,
    plainText: richTextObject.plain_text,
    href: richTextObject.href,
  }

  if (richTextObject.type == 'text') {
    const text: PlainText = {
      content: richTextObject.text?.content ?? '',
    }

    if (richTextObject.text?.link) {
      text.link = {
        url: richTextObject.text.link.url,
      }
    }

    richText.text = text
  } else if (richTextObject.type === 'equation') {
    const equation: Equation = {
      expression: richTextObject.equation?.expression ?? '',
    }
    richText.equation = equation
  }

  return richText
}
