import $ from "jQuery";
import "./styles.css";
import store from "./store";
import api from "./api";
import bookmarkList from "./bookmark-list";

const main = function () {
	api.getMarks().then((bookmarks) => {
		bookmarks.forEach((bookmark) => store.addMark(bookmark));
		bookmarkList.render();
	});
	bookmarkList.bindEventListeners();
	bookmarkList.render();
};

$(main);
