"use strict";

const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const findById = function (id) {
  return this.bookmarks.find((currentBookmark) => currentBookmark.id === id);
};

const addMark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const filterMarks = function (list) {
  return list.filter((filter) => bookmark.rating >= this.filter);
};

const expand = function (bookmark) {
  bookmark.expanded = !bookmark.expanded;
};

const findAndDeleteMark = function (id) {
  this.bookmarks = this.bookmarks.filter(
    (currentBookmark) => currentBookmark.id !== id
  );
};

const errorSet = function (error) {
  this.error = error;
};

const findAndAddNewinfo = function (id, newInfo) {
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newInfo);
  console.log(currentBookmark);
};

export default {
  findAndAddNewinfo,
  errorSet,
  findAndDeleteMark,
  expand,
  filterMarks,
  addMark,
  findById,
  adding,
  error,
  filter,
  bookmarks,
};
