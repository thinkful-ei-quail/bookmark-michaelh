"use strict";
const BookmarkAPI =
  "https://thinkful-list-api.herokuapp.com/michaelhoover/bookmarks";

const apiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then((Response) => {
      if (!resizeBy.ok) {
        error = { code: resizeBy.status };

        if (!Response.headers.get("content-type").includes("json")) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return Response.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

function bookMarkErase(id) {
  return apiFetch(`${BookmarkAPI}/${id}`, {
    method: "DELETE",
  });
}

function bookmarkAddNewInfo(id, updateInfo) {
  const newInfo = JSON.stringify(updateInfo);
  return apiFetch(`${BookmarkAPI}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: newInfo,
  });
}

function createBookMark(bookmark) {
  const newMark = JSON.stringify(bookmark);
  return apiFetch(`${BookmarkAPI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newMark,
  });
}

function getMarks() {
  return apiFetch(`${BookmarkAPI}`);
}

export default {
  getMarks,
  createBookMark,
  bookmarkAddNewInfo,
  bookMarkErase,
};
