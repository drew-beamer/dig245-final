import { createTheme } from "@mui/material";


const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4AAEC0"
        },
        secondary: {
            main: "#9BB9BF"
        }
    },
    typography: {
        fontFamily: '"Outfit","sans-serif"',
        h1: {
            fontSize: "72px"
        },
        h2: {
            fontSize: "48px"
        },
        h3: {
            fontSize: "36px"
        },
        h4: {
            fontSize: "22px"
        },
        button: {
            fontSize: "28px",
        }
    },

})

export default theme;