import { BaseLayout } from '../components/layout/base'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='ja'>
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  )
}
