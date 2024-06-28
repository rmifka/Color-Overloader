export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  export function multiplyColor(color: Color, scalar: number): Color {
    return {
      r: color.r * scalar,
      g: color.g * scalar,
      b: color.b * scalar,
      a: color.a * scalar,
    };
  }
  
  export interface ColorScheme {
    colorSchemeId: string;
    saberAColor: Color;
    saberBColor: Color;
    environmentColor0: Color;
    environmentColor1: Color;
    obstaclesColor: Color;
    environmentColor0Boost: Color;
    environmentColor1Boost: Color;
  }
  
  export interface ColorSchemesSettings {
    overrideDefaultColors: boolean;
    selectedColorSchemeId: string;
    colorSchemes: ColorScheme[];
  }
  