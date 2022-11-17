import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Menu, Container, Typography, Button, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from "./navbar.module.css"

const pages = ['Home', 'About', 'Feed'];

/* based on code from Material UI documentation */

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const router = useRouter();

    return (
        <AppBar sx={{ boxShadow: 0, alignItems: "center", height: "64px", backgroundColor: "#FCFBFB" }}>
            <Container maxWidth="xl" sx={{ height: "64px" }}>
                <Toolbar disableGutters sx={{ height: "64px" }}>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Link href="/">
                            <Image src="/wordmark.png" alt="hound logo" width={142} height={40} />
                        </Link>

                    </Box>

                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{fill: "#333"}}/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                position: "fixed",
                                zIndex: 3002
                            }}
                        >
                            {pages.map((page) => (
                                <Link href={router.pathname === "Home" ? "/" : `/${page.toLowerCase()}`} className={styles.navbutton}>
                                    <MenuItem key={page} onClick={() => {
                                        handleCloseNavMenu();
                                    }}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </Link>

                            ))}
                        </Menu>

                    </Box>

                    <Box sx={{ width: "100vw", height: "48px", display: { xs: 'flex', sm: 'none' }, justifyContent: "center", position: "fixed", top: "12px", left: "0px", zIndex: -1 }}>
                        <Link href="/">
                            <Image src="/wordmark.png" alt="hound logo" width={142} height={40} />
                        </Link>

                    </Box>



                    <Box sx={{ width: "100%", display: { xs: 'none', sm: 'flex' }, justifyContent: "flex-end" }}>
                        {pages.map((page) => {
                            const active = ((page === 'Home' && router.pathname === "/") || "/" + page.toLowerCase() === router.pathname);
                            return <Link href={page === "Home" ? "/" : `/${page.toLowerCase()}`} className={active ? `activeLink ${styles.navButton}` : `inactiveLink ${styles.navButton}`}>
                                <Typography
                                    key={page}
                                    className={active ? "activeLink" : "inactiveLink"}
                                    sx={{ p: 0, m: 0, color: 'white', display: 'block' }}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                    }}
                                    variant="h4"
                                >
                                    {page}
                                </Typography>

                            </Link>
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;