import { NextResponse } from 'next/server'
import { getNotionBlocksDataInPage } from '../../../../lib/backend/notion'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pageId = searchParams.get('pageId') ?? ''
  const data = await getNotionBlocksDataInPage(pageId)

  return NextResponse.json({ data })
}

// export default async function notionBlockApiHandler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method == 'GET') {
//     // NotionのpageIdに紐づいた全てのブロックを取得する
//     const query = notionBlockGetQueryParamsSchema.safeParse(req.query)
//     if (query.success === false) {
//       return createApiResponse(res).badRequest('invalid params')
//     }
//     const { pageId } = query.data
//     try {
//       const blocks = await getNotionBlocksDataInPage(pageId)
//       return createApiResponse(res).success(blocks)
//     } catch (err) {
//       return createApiResponse(res).internalServerError(`${err}`)
//     }
//   }

//   // メソッドが存在しない時
//   return createApiResponse(res).notFound('not found')
// }
