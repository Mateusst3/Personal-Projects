const fetchData = async () =>{
    const req = await fetch('http://127.0.0.1:8000')
    const json = await req.json();
    return json
}

// eslint-disable-next-line
export default {
    getDataList: async() => {
        return[
            await fetchData()
        ]
    }
}