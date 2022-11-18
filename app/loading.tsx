
import Image from "next/image";
import styles from "./layout.module.css";

export default function Loading() {
    return <div style={{height: "75vh"}}>
        <Image className={styles.image} priority src={"/logo.png"} height={128} width={120} alt="hound logo" />
    </div>
}