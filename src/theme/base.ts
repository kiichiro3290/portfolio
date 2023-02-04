import { createTheme } from '@mui/material/styles'

/**
 * スクロールバーのカスタマイズ参考
 * https://unformedbuilding.com/articles/learn-about-webkit-scrollbar/
 * https://www.ultra-noob.com/blog/2021/58/
 */

export const baseTheme = createTheme({
  shape: { borderRadius: 3 },
  typography: {
    fontFamily: 'Noto Sans JP, sans-serif',
    fontWeightBold: 700,
    fontWeightLight: 200,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
  },

  components: {
    //`MuiCssBaseline`になっているが`CssBaseLine`ても同様に作用した
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar{
            width: 10px;
        },
        ::-webkit-scrollbar-thumb {
            background-color: #FFAF03;
            border-radius: 6px;
        },
        ::-webkit-scrollbar-corner {
          display: none;
        }
        `,
    },
  },
})
