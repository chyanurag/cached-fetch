import { useEffect, useState } from 'react'

async function cachedFetch({ url, refetch }) {
    if(refetch) {
        console.log('REFETCH')
        let resp = await fetch(url)
        resp = await resp.json()
        resp = JSON.stringify(resp)
        localStorage.setItem(url, resp)
        return resp
    }
    const data = localStorage.getItem(url)
    if(data == null) {
        console.log('MISS')
        let resp = await fetch(url)
        resp = await resp.json()
        resp = JSON.stringify(resp)
        localStorage.setItem(url, resp)
        return resp
    }
    console.log('HIT')
    return data
}

export default function App() {
    const [data, setData] = useState(null)

    useEffect(() => {
        (async() => {
            const json = await cachedFetch({
                url: 'https://reqres.in/api/users/1'
            })
            setData(JSON.parse(json)['data'])
        })()
    }, [])

    return (
        <div>
            <h1 className="text-2xl text-white bg-red-500 text-center p-2 font-medium font-serif">Hello {data ? data['first_name'] : 'world'}</h1>
        </div>
    )
}
