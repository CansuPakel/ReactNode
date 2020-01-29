import ReactDOM from "react-dom";
import React from "react";

import NoteApp from './components/NoteApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<NoteApp/>, document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
