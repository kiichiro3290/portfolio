import { createApiResponse } from '~/utils/response'
import {
  addPageNotionDb,
  getNotionPagesData,
} from '../../../../lib/backend/notion'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const databaseId = searchParams.get('databaseId') ?? ''

  if (!databaseId) {
    // データベースIDが存在しない場合
    return createApiResponse().badRequest()
  }

  const data = await getNotionPagesData(databaseId)

  if (!data) {
    // データが存在しない場合
    return createApiResponse().badRequest()
  }

  // 成功
  return createApiResponse<Page[]>().success(data)
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const databaseId = searchParams.get('databaseId') ?? ''

  if (!databaseId) {
    // データベースIDが存在しない場合
    return createApiResponse().badRequest()
  }

  const data = await addPageNotionDb(databaseId)

  if (!data) {
    // データが存在しない場合
    return createApiResponse().badRequest()
  }

  // 成功
  return createApiResponse<string>().success(data)
}
