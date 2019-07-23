import React, {useState, useEffect} from 'react'
import {getCats, incrementACat, pickACat} from "./service/cats";
import "./pickACat.css"

export const PickACat = () => {

    const [catLeft, setCatLeft] = useState("")
    const [catRight, setCatRight] = useState("")

    useEffect(() => {
        pickACat([])
            .then(response => {
                console.log(response)
                setCatLeft(response)
                pickACat([response.id])
                    .then(response => {
                        console.log(response)
                        setCatRight(response)
                    })
            })
    }, [])


    const handleCatLeft = (event) => {
        incrementACat(catLeft)
            .then((res) => {
                pickACat([catLeft.id,catRight.id])
                    .then(response => {
                        setCatRight(response)
                    })

            })
    }

    const handleCatRight = (event) => {
        incrementACat(catRight)
            .then((res) => {
                pickACat([catLeft.id,catRight.id])
                    .then(response => {
                        setCatLeft(response)
                    })

            })
    }

    return (
        <div>
            <h2>Choose the cutest cat</h2>
        <div className="container-cats">

            <div className="catLeft">
                <img onClick={handleCatLeft}
                     src={catLeft.image}
                     className="img"
                />
                <p>{catLeft.nom}</p>
            </div>
            <div>
                <p>Ou</p>
            </div>
            <div className="catRight">
                <img onClick={handleCatRight}
                     src={catRight.image}
                     className="img"
                />
                <p>{catRight.nom}</p>
            </div>
        </div>
        </div>
    )
}