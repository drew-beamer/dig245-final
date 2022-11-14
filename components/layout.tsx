import styles from "./layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <>
        <div className={styles.navbar}>

        </div>
        <main>{children}</main>
        <div className={styles.footer}>
            
        </div>
    </>

}