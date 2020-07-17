const store = {
    bookmarks: [],
    adding: true,
    error: null,
    filter: 0, 

    addNewBookMark(bookmark) {
        return this.bookmarks.push(bookmark)
    }, 
    findAndDeleteBookMark(id){
        return this.bookmarks.filter(currentBookmark => 
            currentBookmark.id !== id )
    }, 
    findByID(id){
        return this.bookmarks.find(currentBookmark =>
            currentBookmark.id === id)
    },
    setError(newError){
        let error = newError; 
        return error 
    }, 

    findAndUpdate(id, newData){
        let bookmark = this.findByID(id);
        Object.assign(bookmark, newData)
    }, 

    closeAllBookMarks(){
        this.bookmarks.map(bookmark =>
        bookmark.expanded = false
        )
    }, 
}


export{
    store
}