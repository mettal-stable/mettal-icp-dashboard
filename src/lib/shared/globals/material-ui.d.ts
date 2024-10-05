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
    other?: PaletteColorOptions;
    bgGradient: Partial<TypeBackground>;
  }
  export interface Palette {
    other: SimplePaletteColorOptions & ColorPartial;
    s;
    bgGradient: Partial<TypeBackground>;
  }
}
