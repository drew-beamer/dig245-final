import Link from "next/link";
import styles from "./layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <>
        <div className={styles.navbar}>
            <Link href="/about">About/Privacy</Link>
        </div>
        <main>{children}</main>
        <div className={styles.footer}>
            
        </div>
    </>

}