import { NextApiResponse } from 'next'

export type SuccessStatusCode = 200 | 201

export type ErrorstatusCode = 400 | 401 | 403 | 404 | 405 | 500

export type SuccessResponse<T> = {
  status: SuccessStatusCode
  data: T
  success: true
}

export type ErrorResponse = {
  status: ErrorstatusCode
  errorMessage: string
  success: false
}

export type Response<T> = SuccessResponse<T> | ErrorResponse

export type ApiResponse<T> = {
  success: (data: T) => void
  badRequest: (errorMessage?: string) => void
  unauthorized: (errorMessage?: string) => void
  forbidden: (errorMessage?: string) => void
  notFound: (errorMessage?: string) => void
  methodNotAllowed: (errorMessage?: string) => void
  internalServerError: (errorMessage?: string) => void
}

export const createApiResponse = <T>(
  res: NextApiResponse<Response<T>>
): ApiResponse<T> => ({
  success: (data: T) => {
    return res.status(200).json({
      status: 200,
      data,
      success: true,
    })
  },
  badRequest: (errorMessage?: string) => {
    return res.status(400).json({
      status: 400,
      errorMessage: errorMessage ?? '400 Bad Request',
      success: false,
    })
  },
  unauthorized: (errorMessage?: string) => {
    return res.status(401).json({
      status: 401,
      errorMessage: errorMessage ?? '400 Unauthorized',
      success: false,
    })
  },
  forbidden: (errorMessage?: string) => {
    return res.status(403).json({
      status: 403,
      errorMessage: errorMessage ?? '400 Forbidden',
      success: false,
    })
  },
  notFound: (errorMessage?: string) => {
    return res.status(404).json({
      status: 404,
      errorMessage: errorMessage ?? '404 Not Found',
      success: false,
    })
  },
  methodNotAllowed: (errorMessage?: string) => {
    return res.status(405).json({
      status: 405,
      errorMessage: errorMessage ?? '405 Not Allowed',
      success: false,
    })
  },
  internalServerError: (errorMessage?: string) => {
    return res.status(500).json({
      status: 500,
      errorMessage: errorMessage ?? '500 Internal Server Error',
      success: false,
    })
  },
})
