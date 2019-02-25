import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// create a theme instance.
let theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  palette: {
    primary: {
      light: '#26c281',
      main: '#3fc380',
      dark: '#4daf7c',
      contrastText: '#fff'
    },
    secondary: {
      light: '#29f1c3',
      main: '#36d7b7',
      dark: '#4ecdc4',
      contrastText: '#fff'
    },
    error: {
      light: '#f89406',
      main: '#f9690e',
      dark: '#d35400',
      contrastText: '#fff'
    },
    text: {
      primary: '#24252a',
      secondary: '#2e3131',
      disabled: '#dadfe1',
      hint: '#abb7b7'
    }
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    button: {
      textTransform: 'none'
    },
    useNextVariants: true
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
        padding: theme.spacing.unit
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: 20
      }
    }
  },
  shadows: theme.shadows.fill(`0 0 0 1px ${theme.palette.grey[300]}`)
};

export default theme;
