import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#1c1c1c",
        contrastText: "#f3f3f4",
      },
      secondary: {
        main: "#f3f3f4",
        contrastText: "#1c1c1c",
      },
      background: {
        paper: "#f3f3f4",
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
  }),
);
