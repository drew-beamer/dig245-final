import { Box, Button, Grid, Typography } from "@mui/material"
import Link from "next/link"

export default function Home() {

  return <Box sx={{ mt: 3, px: 2 }}>
    <Box sx={{ background: "linear-gradient(282.11deg, #9BB9BF 0%, #4AAEC0 100%)", borderRadius: "50px", minHeight: "calc(80vh - 64px)", display: "flex", alignItems: "center" }}>
      <Grid container spacing={0} >
        <Grid item xs={1}></Grid>
        <Grid item xs={10} md={5}>
          <Typography variant="h1" sx={{ color: "#FCFBFB" }}>
            Social media, without the bite.
          </Typography>
        </Grid>
        <Grid item xs={1} md={6}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} md={2}>
          <Link href={"/feed"} className={"inactiveLink"}>
            <Button variant="contained" color="secondary" sx={{ color: "#FCFBFB", textTransform: "none", borderRadius: "10px", mt: 1, textDecoration: "none" }}>Open Feed</Button>
          </Link>

        </Grid>

      </Grid>
    </Box>

  </Box>
}