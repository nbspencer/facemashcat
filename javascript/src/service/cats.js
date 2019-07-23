
export const getCats = () => {
    const url = "/api/cats";
    return fetch(url,
        {
        })
        .then(response => response.json());
}

export const pickACat = (ids) => {
    const url = "/api/cats/pick";
    return fetch(url,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(response => response.json());
}

export const incrementACat = (cat) => {
    const url = "/api/cats/increment";
    return fetch(url,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cat)
        })
        .then(response => response.json());
}
