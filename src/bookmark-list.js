"use strict";

import $ from "jQuery";
import api from "./api";
import store from "./store";

//generate functions

const generateView = function (marksString) {
	return;
	`<div>
      <div class = "container">
         <button class = "new-mark js-new-mark">
           <span id = "name-of-button">New Bookmark<span>
         </button
         <form class = "filter js-filter">
            <label for="rating-min">Rating</label>
             <select id ="rating-min" name = "rating-min>
                <option value="1">1/5</option>
                <option value="2">2/5</option>
                <option value="3">3/5</option>
                <option value="4">4/5</option>
                <option value="5">5/5</option>
             </select>
             <input type ="submit" id ="submit" value="set min rating"
         </form>
         <ul class = "marks-list js-mark-list">
         ${marksString}
         </ul>
      </div>
    </div>`;
};

const generateNewMark = () => {
	return;

	`<h3>New BookMark</h3>
    <form class="new-bookmark">
    <label for="bookmark-title" class="hidden"></label>
    <input type="text" id="bookmark-title" name="book-mark" placeholder="title" required>

    <label for="bookmark-url" class="hidden"></label>
    <input type="text" id="bookmark-url" name="book-url" placeholder="URL" required>

    <label for="bookmark-rating" class="hidden"></label>
    <select name="rating" id="rating">
     <option value="1">1/5</option>
     <option value="2">2/5</option>
     <option value="3">3/5</option>
     <option value="4">4/5</option>
     <option value="5">5/5</option>
    </select>
    <label for="description" class="hidden">Description</label>
    <textarea name="bookmark-description" id="bookmark-description" placeholder="Add Descritption"  cols="30" rows="10"></textarea>
    </form>
    <div class="rows">
    <button class="cancel js-cancel">
    <span class="label">Cancel</span>
    </button>
    <button class="create js-create">Create</button>
    </div>`;
};

const generateBookMarkElement = function (bookmark) {
	if (bookmark.expanded) {
		return;
		`<li class="bookmark-element js-bookmark-element" data-bookmark-id="${bookmark.id}">
      <section class="container">
         <div class="title"
        <h2>${bookmark.title}</h2>
        </div>
        <div class="button-container">
        <button class="edit js-edit">
        <span class="label">Edit</span>
        </button>
        <button class="delete js-delete">
        <span class="label">Delete</span>
        </button>
        </div>

      </section>

      <div class="container" id="expand-${bookmark.id}">
      <button class="visit-url js-visit">
      <a href="${bookmark.url}" target="_blank>Visit ${bookmark.title}</a>
      </button>   
      <div class="rating js-rating">
      <h3>${bookmark.rating} / 5</h2>
      </div>
      </div>
      <div class="description js-description">
      <p>${bookmark.desc}</p>
      </div>
      </li> `;
	} else {
		return;
		`
    <li class="bookmark-element" data-bookmark-id="${bookmark.id}">
    <section class="container">
    <div class="bookmark-title js-title">
    <h2>${bookmark.title}</h2>
    </div>
    <div class="rating js-rating">
    <h2>${bookmark.rating}</h2>
    </div>
    </section>
    </li>
    `;
	}
};

const generateStr = function (bookmarklist) {
	const filteredMarks = store.filterMarks(bookmarklist);
	const bookmarks = filteredMarks.map((bookmark) =>
		generateBookMarkElement(bookmark)
	);
	return bookmarks.join("");
};

const generateError = function (message) {
	return `
   <section class="error-content container>
   <button id="cancel-error">close</button>
   <h3>${message}</h3>
   </section>
  `;
};

const render = function () {
	let bookmarks = [...store.bookmarks];
	if (!store.adding) {
		const bookmarksListString = generateStr(bookmarks);
		const initialView = generateView(bookmarksListString);
		$("main").html(initialView);
	} else if (store.adding) {
		const addBookmarkView = generateNewMark();
		$("main").html(addBookmarkView);
	}
};

const renderError = function () {
	if (store.error) {
		const errorMesg = generateError(store.error);
		$(".error").html(errorMesg);
	} else {
		$(".error").empty();
	}
};

const handleNewBookmark = function () {
	$("main").on("click", ".js-new-mark", (e) => {
		store.adding = true;
		render();
	});
};

const handleCancle = function () {
	$("main").on("click", ".js-cancel", (e) => {
		store.adding = false;
		store.errorSet(null);
		renderError();
		render();
	});
};

const handleNewBookmarkCreate = function () {
	$("main").on("click", ".js-create", (e) => {
		e.preventDefault();
		const newUrl = $("#bookmark-url").val();
		const newtitle = $("#bookmark-title").val();
		const newRating = $("#bookmark-rating").val();
		const newDescription = $("#bookmark-desc").val();
		const newBookmarkData = {
			url: newUrl,
			title: newtitle,
			rating: newRating,
			desc: newDescription,
		};
		api
			.createBookMark(newBookmarkData)
			.then((newBookmark) => {
				store.addMark(newBookmark);
				store.adding = false;
				store.errorSet(null);
				renderError();
				render();
			})
			.catch((error) => {
				store.errorSet(error.message);
				renderError;
			});
	});
};
const handleCloseError = function () {
	$(".error-container").on("click", "#cancel-error", (event) => {
		store.setError(null);
		renderError();
	});
};

const bindEventListeners = function () {
	handleCancle();
	handleNewBookmarkCreate();
	handleCancle();
	handleNewBookmark();
};
export default {
	render,
	bindEventListeners,
};
