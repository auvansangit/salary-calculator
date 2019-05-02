import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
  PaletteColor,
  Palette,
  PaletteOptions
} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
  }

  type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  }

  interface Palette {
    success: PaletteColor;
    info: PaletteColor;
    warning: PaletteColor;
  }

  interface PaletteOptions {
    success?: PaletteColorOptions;
    info?: PaletteColorOptions;
    warning?: PaletteColorOptions;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    palette: PaletteOptions;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}
