import { Fragment } from 'react'
import { Box, Typography, Divider, Alert, Link, Card } from '@mui/material'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism'
import { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react'

// シンタックスハイライトのCSSテンプレートがいくつか定義されている→その中で一番かっこいいのがa11yDark
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import { Container } from '@mui/system'
import { theme } from '../../../../theme'

type CodeBlockTitleProps = {
  fileName: string
}
const CodeBlockTitle: React.FC<CodeBlockTitleProps> = ({ fileName }) => {
  return (
    <Box
      component='div'
      sx={{
        display: 'inline-block',
        position: 'absolute',
        top: `-${theme.spacing(4)}`,
        left: 0,
        padding: theme.spacing(0.7),
        color: 'white',
        backgroundColor: 'CaptionText',
        borderRadius: `${theme.spacing(0.8)} ${theme.spacing(0.8)} 0 0`,
      }}
    >
      {fileName}
    </Box>
  )
}
const CodeBlock: CodeComponent = ({
  children,
  className,
  inline,
}: CodeProps) => {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = /language-(\w+)(:.+)/.exec(className || '')
  const lang = match && match[1] ? match[1] : ''
  const name = match && match[2] ? match[2].slice(1) : ''
  return (
    <Box sx={{ position: 'relative' }}>
      {name && <CodeBlockTitle fileName={name} />}
      <SyntaxHighlighter language={lang} style={a11yDark}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </Box>
  )
}

export const useConvertNotionWithReactComponent = () => {
  const convertNotionWithReactComponent = (block: Block) => {
    if (block.heading1) {
      return (
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            my: theme.spacing(4),
          }}
        >
          <Typography variant='h4' component='h2'>
            {block.heading1.richTexts[0].plainText}
          </Typography>
          <Divider />
        </Box>
      )
    }

    if (block.heading2) {
      return (
        <Typography
          variant='h5'
          component='h3'
          sx={{ mt: theme.spacing(4), mb: theme.spacing(2) }}
        >
          {block.heading2.richTexts[0].plainText}
        </Typography>
      )
    }

    if (block.heading3) {
      return (
        <Typography
          variant='h6'
          component='h4'
          sx={{ mt: theme.spacing(4), mb: theme.spacing(2) }}
        >
          {block.heading3.richTexts[0].plainText}
        </Typography>
      )
    }

    if (block.paragraph) {
      return (
        <Typography variant='body1' component='p'>
          {block.paragraph.richTexts[0].plainText}
        </Typography>
      )
    }

    if (block.bulletedListItem) {
      return (
        <ol>
          <li>{block.bulletedListItem.richTexts[0].plainText}</li>
          {block.bulletedListItem.children?.map((item, id) => (
            <Fragment key={id}>
              {convertNotionWithReactComponent(item)}
            </Fragment>
          ))}
        </ol>
      )
    }

    if (block.numberedListItem) {
      return (
        <ol>
          <li>{block.numberedListItem.richTexts[0].plainText}</li>
          {block.numberedListItem.children?.map((item, id) => (
            <Fragment key={id}>
              {convertNotionWithReactComponent(item)}
            </Fragment>
          ))}
        </ol>
      )
    }

    if (block.toDo) {
      return (
        <ol>
          <li>{block.toDo.richTexts[0].plainText}</li>
          {block.toDo.children?.map((item, id) => (
            <Fragment key={id}>
              {convertNotionWithReactComponent(item)}
            </Fragment>
          ))}
        </ol>
      )
    }

    if (block.quote) {
      return (
        <Box
          sx={{
            borderLeft: 'solid',
            pl: '8px',
          }}
        >
          <Typography component='p' variant='body1'>
            {block.quote.richTexts[0].plainText}
          </Typography>
        </Box>
      )
    }

    if (block.callout) {
      return (
        <Alert severity='info' sx={{ my: theme.spacing(1) }}>
          <Typography component='p' variant='body1'>
            {block.callout.richTexts[0].plainText}
          </Typography>
        </Alert>
      )
    }

    if (block.code) {
      return (
        <Box sx={{ mb: theme.spacing(4), mt: theme.spacing(6) }}>
          <ReactMarkdown className='' components={{ code: CodeBlock }}>
            {block.code.richTexts[0].plainText ?? ''}
          </ReactMarkdown>
        </Box>
      )
    }

    if (block.bookmark) {
      return (
        <Link
          component='a'
          href={block.bookmark.url}
          underline='none'
          target='_blank'
        >
          <Card
            component='div'
            sx={{
              height: theme.spacing(12),
              my: theme.spacing(2),
              display: 'flex',
              flexDirection: 'column',
              borderLeft: 'solid',
              borderRight: 'solid',
              borderLeftColor: theme.palette.primary.main,
              borderRightColor: theme.palette.primary.main,
              borderLeftWidth: theme.spacing(0.8),
              borderRightWidth: theme.spacing(0.8),
              p: theme.spacing(1.5),
            }}
          >
            <Typography
              sx={{
                height: theme.spacing(5),
                lineHeight: theme.spacing(5),
                textOverflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {'todo: ogp'}
            </Typography>

            <Typography
              variant='caption'
              sx={{
                textOverflow: 'hidden',
                height: theme.spacing(2),
                lineHeight: theme.spacing(2),
                whiteSpace: 'nowrap',
              }}
            >
              {'todo: ogp'}
            </Typography>
          </Card>
        </Link>
      )
    }

    if (block.image) {
      return (
        <Container maxWidth='md' sx={{ my: theme.spacing(4) }}>
          <Image
            src={block.image.file?.url ?? ''}
            alt={block.type}
            width={600}
            height={400}
          />
        </Container>
      )
    }
  }

  return { convertNotionWithReactComponent }
}
