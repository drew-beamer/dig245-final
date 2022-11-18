import Image from "next/legacy/image";
import { useState } from "react";
import { DogBreed } from "../types/DogImage";
import styles from "./post.module.css"

interface PostProps {
    url: string,
    breed: DogBreed,
    updateLike: (index: number) => void
    index: number,
    liked: boolean
}

export default function Post({ url, breed, updateLike, liked, index }: PostProps) {

    return <div>temp</div>
    /*const [doubleClickLikeShow, setDoubleClickLikeShow] = useState(false);

    const styledBreed = breed.charAt(0).toUpperCase() + breed.slice(1);
    return <Box sx={{ zIndex: 0 }}>
        <Box>
            <Image className={styles.postImage} priority={index <= 1} layout="responsive" width={300} height={200} src={url} alt={`${breed}`} onClick={(e) => {
                if (e.detail == 2) {
                    if (!liked) {
                        updateLike(index);
                    }
                }
            }} />
        </Box >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
            {liked ? <Favorite className={`${styles.animate} ${styles.pop}`} sx={{ fontSize: "28px", fill: "#4AAEC0", width: "10%" }} onClick={() => {
                console.log("weight decreasing");
                updateLike(index)

            }} /> : <FavoriteBorder sx={{ fontSize: "28px", fill: "#333", width: "10%" }} onClick={() => {
                console.log("weight increasing")
                updateLike(index)
                console.log("here")

            }} />}
            <h4 style={{ lineHeight: "0", fontSize: "24px", width: "90%", margin: 0 }}>{`${styledBreed}`}</h4>
        </Box>

    </Box> */

}

/*

*/