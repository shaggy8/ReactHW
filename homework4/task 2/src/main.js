import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, hashHistory } from 'react-router';

import ArticlesList from './components/ArticlesList.jsx';
import App from './components/App.jsx';
import Text from './components/Text.jsx';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path='/' component={App}>
			<Route path='/articles' component={ArticlesList} />
			<Route path='/article/:id' component={Text} />
		</Route>
	</Router>,
    document.getElementById("content")
);