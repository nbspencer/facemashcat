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
            <div className="table-title">
                <h3>The most beautiful cat</h3>
            </div>
            <table className="table-fill">
                <thead>
                <tr>
                    <th className="text-left">name</th>
                    <th className="text-left">image</th>
                    <th className="text-left">counter</th>
                </tr>
                </thead>
                <tbody className="table-hover">
                {
                    cats && cats.map(cat =>
                        <tr key={cat.id}>
                            <td className="text-left">{cat.name}</td>
                            <td className="text-left">
                                <img
                                    className="img-table"
                                    src={cat.image}
                                />
                            </td>
                            <td className="text-left">{cat.counter}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )

}