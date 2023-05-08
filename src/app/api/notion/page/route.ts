import { NextResponse } from 'next/server'
import { getNotionPagesData } from '../../../../lib/backend/notion'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const databaseId = searchParams.get('databaseId') ?? ''
  const data = await getNotionPagesData(databaseId)

  return NextResponse.json({ data })
}

// const notionPagesGetQueryParamsSchema =
//   schemaForType<NotionPagesGetQueryParams>()(
//     z.object({ databaseId: z.string() })
//   )

// const notionPagesPostQueryParamsSchema =
//   schemaForType<NotionPagesPostQueryParams>()(
//     z.object({ databaseId: z.string() })
//   )

// export default async function notionPageApiHandler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method == 'GET') {
//     // Notionのデータベースに紐づいた全てのページを取得する
//     const query = notionPagesGetQueryParamsSchema.safeParse(req.query)
//     if (query.success === false) {
//       return createApiResponse(res).badRequest('invalid params')
//     }
//     const { databaseId } = query.data

//     try {
//       const pages = await getNotionPagesData(databaseId)
//       return createApiResponse(res).success(pages)
//     } catch (err) {
//       return createApiResponse(res).internalServerError(`${err}`)
//     }
//   }
//   if (req.method == 'POST') {
//     // データベースにページを投稿する
//     const query = notionPagesPostQueryParamsSchema.safeParse(req.query)
//     if (query.success === false) {
//       return createApiResponse(res).badRequest('invalid params')
//     }
//     const { databaseId } = query.data

//     try {
//       addPageNotionDb(databaseId)
//     } catch (err) {
//       return createApiResponse(res).internalServerError(`${err}`)
//     }
//   }

//   // メソッドが存在しない時
//   return createApiResponse(res).notFound('not found')
// }
