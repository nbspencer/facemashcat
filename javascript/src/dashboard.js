import React, {useState, useEffect} from 'react'
import {getCats} from "./service/cats";
import './dashboard.css'

export const Dashboard = () => {
    const [cats, setCats] = useState([])

    useEffect(() => {
        getCats()
        .then(response => {
            console.log(response)
            setCats(response.sort(function(a, b){return b.counter-a.counter}));
        })
    }, [])

    return (
        <div align="center">
            <h1>The most beautiful cat</h1>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>nom</th>
                    <th>image</th>
                    <th>counter</th>
                </tr>
                </thead>
                <tbody>
                {
                    cats && cats.map(cat =>
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.nom}</td>
                            <td>
                                <img
                                    className="img-table"
                                    src={cat.image}
                                />
                            </td>
                            <td>{cat.counter}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )

}