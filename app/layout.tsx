// css imports
import styles from "./layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Navbar from "../components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <head />
      <body>
        <Navbar />
        <main className={styles.content}>{children}</main>

      </body>
    </html>
  )
}
