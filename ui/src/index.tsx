import { Router } from "@solidjs/router";
/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import './index.css';
import { routes } from "./routes";

const root = document.getElementById('root')

if (!root) {
	throw new Error('Root element not found')
}

render(() => (
	<Router root={App}>
		{routes}
	</Router>),
	root,
);
