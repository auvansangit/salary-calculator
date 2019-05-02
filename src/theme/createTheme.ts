import createMuiTheme, {
  ThemeOptions
} from '@material-ui/core/styles/createMuiTheme';

export default function createTheme(options: ThemeOptions) {
  return createMuiTheme({
    palette: {
      success: {
        light: '#28d17c',
        main: '#11c26d',
        dark: '#05a85c',
        contrastText: '#fff'
      },
      info: {
        light: '#28c0de',
        main: '#0bb2d4',
        dark: '#0099b8',
        contrastText: '#fff'
      },
      warning: {
        light: '#f57d1b',
        main: '#eb6709',
        dark: '#e79857',
        contrastText: 'fff'
      }
    },
    ...options
  });
}
