"use strict"
const BookmarkAPI =
	"https://thinkful-list-api.herokuapp.com/michaelhoover/bookmarks"

const apiFetch = function (...args) {
	let error
	return fetch(...args)
		.then((Response) => {
			if (!Response.ok) {
				error = { code: Response.status }

				if (!Response.headers.get("content-type").includes("json")) {
					error.message = Response.statusText
					return Promise.reject(error)
				}
			}
			return Response.json()
		})
		.then((data) => {
			if (error) {
				error.message = data.message
				return Promise.reject(error)
			}
			return data
		})
}

function bookMarkErase(id) {
	return apiFetch(`${BookmarkAPI}/${id}`, {
		method: "DELETE",
	})
}

function bookmarkAddNewInfo(id, updateInfo) {
	const newInfo = JSON.stringify(updateInfo)
	//console.log(newInfo);
	return apiFetch(`${BookmarkAPI}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: newInfo,
	})
}

function createBookMark(bookmark) {
	const newMark = JSON.stringify(bookmark)
	return apiFetch(`${BookmarkAPI}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newMark,
	})
}

function getMarks() {
	return apiFetch(`${BookmarkAPI}`)
}

export default {
	getMarks,
	createBookMark,
	bookmarkAddNewInfo,
	bookMarkErase,
}
