


export const fetchData = () => {
 
    const getData = new Promise((resolve, reject) => {

        const data = localStorage.getItem('data');

        if (data) {
            resolve(JSON.parse(data))
        }
        else {
            reject('Failed to get user data')
        }
    })

 
    return getData

}