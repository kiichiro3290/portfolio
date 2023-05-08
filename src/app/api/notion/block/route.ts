import { BlocksObjectSerialized } from '~/types/notion/block'
import { createApiResponse } from '~/utils/response'
import { getNotionBlocksDataInPage } from '../../../../lib/backend/notion'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pageId = searchParams.get('pageId')

  if (!pageId) {
    // ページIDが存在しない場合
    return createApiResponse().badRequest()
  }

  const data = await getNotionBlocksDataInPage(pageId)

  if (!data) {
    // データが存在しない場合
    return createApiResponse().badRequest()
  }

  // 成功
  return createApiResponse<BlocksObjectSerialized[]>().success(data)
}
