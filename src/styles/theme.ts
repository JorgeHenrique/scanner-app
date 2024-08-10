import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      backgroundLight: string;
      backgroundDark: string;
      textLight: string;
      textDark: string;
    };
  }
}
