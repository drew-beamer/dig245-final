import { ThemeProvider } from "@mui/material";
import styles from "./layout.module.css";
import ResponsiveAppBar from "./navbar";
import theme from "./theme";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <ThemeProvider theme={theme}>
        <div className={styles.navbar}>
            <ResponsiveAppBar />
        </div>
        <main className={styles.content}>{children}</main>
        <div className={styles.footer}>
            
        </div>
    </ThemeProvider>

}