const BASE_URL = "https://thinkful-list-api.herokuapp.com/michaelhoover";


let fetchBookMark = (...args) => {
    let error = null; 
    return fetch(...args)
    .then ((response) => {
        if (!response.ok) {
            error = {code: response.status}; 
        }
        return response.json(); 
    })
    .then((data) => {
        if (error){
            error.message = data.message;
            return Promise.reject(error);
        }
        return data;
    })
}

let bookMarkDelete =(id) => {
    return fetchBookMark(`${BASE_URL}/${id}}`,{
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
        }

    })
}

let bookMarkCreate = (bookmark) => {
    let newBookMark = JSON.stringify(bookmark);
    return fetchBookMark(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    }); 
}

let getBookMark = (bookmark) => {
    return fetchBookMark(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    });
}


export {
    fetchBookMark,
    bookMarkDelete,
    bookMarkCreate,
    getBookMark
}