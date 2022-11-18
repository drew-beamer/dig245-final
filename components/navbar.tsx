'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./css/navbar.module.css";

const pages = ["Home", "About", "Feed"]




interface NavbuttonProps {
    text: string
    href: string
}

function Navbutton({ text, href }: NavbuttonProps) {
    const location = usePathname();
    const isActive = href === location ? "activeLink" : "inactiveLink";
    return <Link href={href} className={`${styles.button} ${isActive}`}>
        <div>
            <h4 className={isActive}>{text}</h4>
        </div>
    </Link>
}

export default function Navbar() {
    return <div className={styles.navContainer}>

        <div className={styles.largeDeviceLogo}>
            <Image priority height={30} width={106} src={"/wordmark.png"} alt="hound logo" />
        </div>

        <div className={styles.buttons}>
            {pages.map((page) => {
                const href = page === "Home" ? "/" : "/" + page.toLowerCase()
                return <Navbutton key={page} text={page} href={href} />;
            })}
        </div>


    </div>
}