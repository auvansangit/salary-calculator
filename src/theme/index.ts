import createTheme from './createTheme';

// create a theme instance.
let theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  palette: {
    // Blue
    // primary: {
    //   light: '#589ffc',
    //   main: '#3e8ef7',
    //   dark: '#247cf0',
    //   contrastText: '#fff'
    // },
    // Green
    primary: {
      light: '#28d17c',
      main: '#11c26d',
      dark: '#05a85c',
      contrastText: '#fff'
    },
    // Cyan
    secondary: {
      light: '#28c0de',
      main: '#0bb2d4',
      dark: '#0099b8',
      contrastText: '#fff'
    },
    // Green
    success: {
      light: '#28d17c',
      main: '#11c26d',
      dark: '#05a85c',
      contrastText: '#fff'
    },
    // Cyan
    info: {
      light: '#28c0de',
      main: '#0bb2d4',
      dark: '#0099b8',
      contrastText: '#fff'
    },
    // Orange
    warning: {
      light: '#f57d1b',
      main: '#eb6709',
      dark: '#e79857',
      contrastText: 'fff'
    },
    // Red
    error: {
      light: '#ff666b',
      main: '#ff4c52',
      dark: '#f2353c',
      contrastText: '#fff'
    },
    text: {
      primary: '#24252a',
      secondary: '#2e3131',
      disabled: '#dadfe1',
      hint: '#abb7b7'
    },
    type: 'light'
  },
  typography: {
    fontFamily: '"Muli", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 0
  },
  transitions: {
    create: () => 'none'
  }
});

theme = {
  ...theme,
  overrides: {
    MuiIconButton: {
      root: {
        padding: theme.spacing(1)
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        minWidth: 32
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: 20
      }
    }
  }
};

export default theme;
