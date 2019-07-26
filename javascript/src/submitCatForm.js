import React, {useState, useEffect} from 'react'
import './submitCatForm.css'
import {submitCat} from "./service/cats";

const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE_RATIO = 1.5;
const WIDTH_IMAGE_RATIO = 1.5;

export const SubmitCatForm = () => {

    const [cat, setCat] = useState({
        name: "",
        image: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        submitCat(cat)
            .then(response => {
                if (response.status === 200) {
                    alert("Création réussi");
                    setCat({
                        name: "",
                        image: ""
                    })
                    e.target.reset();
                }else{
                    console.log(response)
                }
            })
    }

    const onChange = (e) => {
        cat[e.currentTarget.name] = e.currentTarget.value;
    }

    const handleImage = (e) => {
        const files = e.currentTarget.files;
        let reader = new FileReader();
        if (files[0] !== undefined) {
            const imageName = files[0].name;
            if (files[0].size <= TAILLE_IMAGE_MAX) {
                reader.readAsDataURL(files[0]);
                reader.onload = (e) => {
                    cat.image = e.target.result;
                };
            } else {
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        const elem = document.createElement('canvas');
                        elem.width = img.width / WIDTH_IMAGE_RATIO;
                        elem.height = img.height / HEIGHT_IMAGE_RATIO;
                        const ctx = elem.getContext('2d');
                        ctx.drawImage(img, 0, 0, elem.width, elem.height);
                        ctx.canvas.toBlob((blob) => {
                            const imgCompress = new File([blob], imageName, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            reader.readAsDataURL(imgCompress);
                            reader.onload = (e) => {
                                cat.image = e.target.result;
                            }
                        }, 'image/jpeg');
                    }
                };
                reader.readAsDataURL(files[0]);
            }
        }
    }

    return (
        <div align="center">
            <form className="form-cat" onSubmit={handleSubmit}>
                <div className="div-input">
                    <label htmlFor="name">Name </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={onChange}
                    />
                </div>
                <div className="div-input">
                    <label htmlFor="image">My picture</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />
                </div>
                <div >
                <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    )
}