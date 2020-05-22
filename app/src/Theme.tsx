import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { FontFace } from "csstype";

import OpenSansRegularTtf from "../fonts/open-sans/open-sans-v17-latin-regular.ttf";
import OpenSansRegularWoff from "../fonts/open-sans/open-sans-v17-latin-regular.woff";
import OpenSansRegularWoff2 from "../fonts/open-sans/open-sans-v17-latin-regular.woff2";

import OpenSans700Ttf from "../fonts/open-sans/open-sans-v17-latin-700.ttf";
import OpenSans700Woff from "../fonts/open-sans/open-sans-v17-latin-700.woff";
import OpenSans700Woff2 from "../fonts/open-sans/open-sans-v17-latin-700.woff2";

const OpenSansRegular: FontFace = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontDisplay: "swap",
  src: `
    local('Open Sans Regular'), local('OpenSans-Regular')
    url(${OpenSansRegularWoff2}) format('woff2'),
    url(${OpenSansRegularWoff}) format('woff'),
    url(${OpenSansRegularTtf}) format('truetype'),
  `,
};

const OpenSans700: FontFace = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 700,
  fontDisplay: "swap",
  src: `
    local('Open Sans Bold'), local('OpenSans-Bold')
    url(${OpenSans700Woff2}) format('woff2'),
    url(${OpenSans700Woff}) format('woff'),
    url(${OpenSans700Ttf}) format('truetype'),
  `,
};

export const colors = {
  dark: "#1c1c1c",
  light: "#f3f3f4",
};

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: colors.dark,
        contrastText: colors.light,
      },
      secondary: {
        main: colors.light,
        contrastText: colors.dark,
      },
      background: {
        paper: colors.light,
        default: "#ffffff",
      },
    },
    typography: {
      fontFamily: ['"Open Sans"', "sans-serif"].join(","),
      h1: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
        fontSize: "4.2rem",
        marginBottom: "1rem",
        lineHeight: 0.8,
      },
      h2: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
        fontSize: "3.2rem",
      },
      h3: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
        fontSize: "2.8rem",
      },
      h4: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
        fontSize: "2.2rem",
      },
      h5: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
        fontSize: "1.6rem",
      },
      h6: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
        fontSize: "1.2rem",
      },
      subtitle1: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      subtitle2: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      body1: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      body2: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      button: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      caption: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      overline: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [OpenSansRegular, OpenSans700],
        },
      },
    },
  }),
);
