// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { DogBreed, DogImage } from "../../types/DogImage";
import { BreedWeights } from "../../types/BreedWeights";
import DogImages from "../../json/DogImages.json";

type ImageData = {
    images: DogImage[]
    message: string
}

type InvalidRequest = {
    message: string
}

function isBreedWeights(data: any): data is BreedWeights {
    return typeof (data.husky) === 'number' &&
        typeof (data.pug) === 'number' &&
        typeof (data.labrador) === 'number' &&
        typeof (data.hound) === 'number' &&
        typeof (data.corgi) === 'number' &&
        data.husky + data.pug + data.labrador + data.hound + data.corgi == 1
}

function selectBreedGivenWeights(weights: BreedWeights): DogBreed {
    const breeds: DogBreed[] = Object.keys(weights) as DogBreed[]
    let random = Math.random();
    for (let i = 0; i < Object.keys(weights).length; i++) {
        if (random < weights[breeds[i]]) {
            return breeds[i]
        } else {
            random -= weights[breeds[i]]
        }
    }
    throw "This shouldn't be reached"
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ImageData | InvalidRequest>
) {
    const weights = req.body
    if (!isBreedWeights(weights)) {
        res.status(400).json({
            message: "bad data"
        })
    } else {

        let images: DogImage[] = [];

        for (let i = 0; i < 5; i++) {
            const breed: DogBreed = selectBreedGivenWeights(weights);
            const random = Math.floor(Math.random() * DogImages[breed].length + 1)
            const url: string = DogImages[breed][random]
            images.push({
                "url": url,
                "breed": breed
            })
        }

        res.status(200).json({
            "images": images,
            "message": "success"
        })
    }

}
