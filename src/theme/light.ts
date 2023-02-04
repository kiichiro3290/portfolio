import { baseTheme } from './base'

import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    background: {
      default: '#f9f3e9',
      paper: '#FFFFFF',
    },
    mode: 'light',
    primary: {
      contrastText: '#222222',
      main: '#FFAF03',
    },
    secondary: {
      contrastText: '#5e5e5e',
      main: '#B2F6FF',
    },
    text: {
      primary: '#555555',
      secondary: '#696969',
    },
  },
})
