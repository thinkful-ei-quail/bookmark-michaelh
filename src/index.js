import $ from "jQuery";
import "./styles.css";
import store from "./store";
import Api from "./api";
import bookmarkList from "./bookmark-list";

const main = function () {
	getMarks();
	console.log(getMarks());
	// .then((bookmarks) => {
	//   bookmarks.forEach((bookmark) => store.addMark(bookmark));
	//   bookmarkList.render();
	// });
	// //bookmarkList.bindEventListeners();
	//bookmarkList.render();
};
$(main);
