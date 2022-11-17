import styles from "./layout.module.css";
import ResponsiveAppBar from "./navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <>
        <div className={styles.navbar}>
            <ResponsiveAppBar />
        </div>
        <main className={styles.content}>{children}</main>
        <div className={styles.footer}>
            
        </div>
    </>

}