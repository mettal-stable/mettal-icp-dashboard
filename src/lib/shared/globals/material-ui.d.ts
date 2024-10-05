// material-ui.d.ts
import {
  PaletteOptions,
  PaletteColorOptions,
  Palette,
  SimplePaletteColorOptions,
  ColorPartial,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    alternate?: PaletteColorOptions;
  }
  export interface Palette {
    alternate: SimplePaletteColorOptions & ColorPartial;
  }
}
