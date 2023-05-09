import { getNotionAllBlock } from '~/lib/backend/notion'
import { createApiResponse } from '~/utils/response'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pageId = searchParams.get('pageId')

  if (!pageId) {
    // ページIDが存在しない場合
    return createApiResponse().badRequest()
  }

  const data = await getNotionAllBlock(pageId)

  if (!data) {
    // データが存在しない場合
    return createApiResponse().badRequest()
  }

  // 成功
  return createApiResponse<Block[]>().success(data)
}
