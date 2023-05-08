import { NextResponse } from 'next/server'

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

export const createApiResponse = <T>(): ApiResponse<T> => ({
  success: (data: T) => {
    return new NextResponse(
      JSON.stringify({
        status: 200,
        data,
        success: true,
      })
    )
  },
  badRequest: (errorMessage?: string) => {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        errorMessage: errorMessage ?? '400 Bad Request',
        success: false,
      })
    )
  },
  unauthorized: (errorMessage?: string) => {
    return new NextResponse(
      JSON.stringify({
        status: 401,
        errorMessage: errorMessage ?? '400 Unauthorized',
        success: false,
      })
    )
  },
  forbidden: (errorMessage?: string) => {
    return new NextResponse(
      JSON.stringify({
        status: 403,
        errorMessage: errorMessage ?? '400 Forbidden',
        success: false,
      })
    )
  },
  notFound: (errorMessage?: string) => {
    return new NextResponse(
      JSON.stringify({
        status: 404,
        errorMessage: errorMessage ?? '404 Not Found',
        success: false,
      })
    )
  },
  methodNotAllowed: (errorMessage?: string) => {
    return new NextResponse(
      JSON.stringify({
        status: 405,
        errorMessage: errorMessage ?? '405 Not Allowed',
        success: false,
      })
    )
  },
  internalServerError: (errorMessage?: string) => {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        errorMessage: errorMessage ?? '500 Internal Server Error',
        success: false,
      })
    )
  },
})
