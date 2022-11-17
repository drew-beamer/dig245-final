import { Box, Grid } from "@mui/material";


export default function About() {
    return <Box>
        <Grid container spacing={3}>
            <Grid item>
                <h3>Privacy</h3>
            </Grid>
            <Grid item>
                <p>
                    This site is intended to raise awareness about privacy on the web.
                    <br />
                    hound does not store any information outside of the session.
                    Hound has no database and does not use cookie. While you are on the site, hound uses a React state to keep track of
                    the current weights to get each image with, and then fetches images from our server using those weights.

                    <br />
                    No information that can be used to tie likes to a user is collected.
                    <br />
                    I do not sell any information because, well, I have no information to sell.

                </p>
            </Grid>
        </Grid>
    </Box>
}