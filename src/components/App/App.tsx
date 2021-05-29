import React from "react";

import { Header } from "../Header/Header";
import Table from "../Table/Table";

import "./App.scss";

const App: React.FC = () => {
	return (
		<div className="App">
			<Header />
			<main>
				<Table />
			</main>
		</div>
	);
};

export default App;
