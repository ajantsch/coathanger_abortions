import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
0;

export default responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: ['"Open Sans"', "sans-serif"].join(","),
      h1: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
      },
      h2: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
      },
      h3: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
      },
      h4: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
      },
      h5: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
      },
      h6: {
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
        fontWeight: 700,
      },
      subtitle1: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      subtitle2: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      body1: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      body2: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      button: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      caption: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
      overline: { fontFamily: ['"Open Sans"', "sans-serif"].join(",") },
    },
  }),
);
