import React, {useState, useEffect} from 'react'

export const AddCatForm = () => {

    const [cat,setCat] = useState(undefined)



    return (
        <div >
            <form action="" method="POST">
                <input
                    name="nom"
                    type="text"

                />
                <input/>
                <input/>
            </form>
        </div>
    )
}