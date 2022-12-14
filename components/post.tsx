import Image from "next/legacy/image";
import { useState } from "react";
import { DogBreed } from "../types/DogImage";
import { Heart, HeartFill } from "react-bootstrap-icons";
import styles from "./css/post.module.css"

interface PostProps {
    url: string,
    breed: DogBreed,
    updateLike: (index: number) => void
    index: number,
    liked: boolean
}

const iconSize = 24;

export default function Post({ url, breed, updateLike, liked, index }: PostProps) {
    const [doubleClickLikeShow, setDoubleClickLikeShow] = useState(false);

    const styledBreed = breed.charAt(0).toUpperCase() + breed.slice(1);

    return <div className={styles.postContainer}>
        <div className={styles.doubleClickIconContainer}>
            {doubleClickLikeShow ? <HeartFill size={96} className={`${styles.animate} ${styles.pop} ${styles.doubleClickHeart}`} onAnimationEnd={() => setDoubleClickLikeShow(false)} /> : null}
        </div>
        <div>

            <Image className={styles.postImage} priority={index <= 1} layout="responsive" width={300} height={200} src={url} alt={`${breed}`} onClick={(e) => {
                if (e.detail == 2) {
                    if (!liked) {
                        updateLike(index);
                    }
                    setDoubleClickLikeShow(true);
                }
            }} />
        </div >
        <div className={styles.imageDataHolder}>
            {liked ? <HeartFill size={iconSize} className={`${styles.animate} ${styles.pop} ${styles.blueFill} ${styles.clickableIcon}`} onClick={() => {
                updateLike(index)

            }} /> : <Heart size={iconSize} className={styles.clickableIcon} onClick={() => {
                updateLike(index)

            }} />}
            <h4>{`${styledBreed}`}</h4>
        </div>

    </div>
}

/*

*/