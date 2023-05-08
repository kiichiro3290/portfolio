'use client'

import { useState } from 'react'

export const usePopOver = () => {
  const [anchorPopOver, setAnchorPopOver] = useState<HTMLButtonElement | null>(
    null
  )
  const handleClickPopOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPopOver(e.currentTarget)
  }
  const handleClosePopOver = () => {
    setAnchorPopOver(null)
  }
  const openPopOver = Boolean(anchorPopOver)

  const [anchorAppPopOver, setAnchorAppPopOver] =
    useState<HTMLButtonElement | null>(null)
  const handleClickAppPopOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorAppPopOver(e.currentTarget)
  }
  const handleCloseAppPopOver = () => {
    setAnchorAppPopOver(null)
  }
  const openAppPopOver = Boolean(anchorAppPopOver)

  return {
    account: {
      anchorPopOver,
      handleClickPopOver,
      handleClosePopOver,
      openPopOver,
    },
    app: {
      anchorAppPopOver,
      handleClickAppPopOver,
      handleCloseAppPopOver,
      openAppPopOver,
    },
  }
}
