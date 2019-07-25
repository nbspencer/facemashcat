import React, {useState, useEffect} from 'react'
import './submitCatForm.css'
import {submitCat} from "./service/cats";

const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE_RATIO = 1.5;
const WIDTH_IMAGE_RATIO = 1.5;

export const SubmitCatForm = () => {

    const [cat,setCat] = useState({
        name :"",
        image :""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        submitCat(cat)
            .then(response => {
                if(response.status >= 200 && response.status < 300) {
                    alert("Création réussi")
                    setCat({
                        name :"",
                        image :""
                    })
                }
            })
    }

    const onChange = (e) => {
        let catForm = cat;
        catForm[e.currentTarget.name] = e.currentTarget.value;
        setCat(catForm);
    }

    const handleImage = (e) => {
        let catForm = cat;

        const files = e.currentTarget.files;
        console.log(files);
        let reader = new FileReader();
        if (files[0] !== undefined) {
            const imageName = files[0].name;
            if (files[0].size <= TAILLE_IMAGE_MAX) {
                reader.readAsDataURL(files[0]);
                reader.onload = (e) => {
                    catForm.image = e.target.result;
                    console.log(e.target.result);
                    setCat(catForm);
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
                                catForm.image = e.target.result;
                                console.log(e.target.result);
                                setCat(catForm)
                            }
                        }, 'image/jpeg');
                    }
                };
                reader.readAsDataURL(files[0]);
            }
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name
                <input
                    name="name"
                    type="text"
                    onChange={onChange}
                    value={cat.nom}
                />
                </label>
                <br/>
                <label>My picture
                     <input type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImage}
                            value={cat.image}
                     />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}