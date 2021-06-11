import React from "react";
import { useThreads } from "./actions/fetchHooks";

const App = () => {
	const { data } = useThreads();

	console.log(data);

	return <div>Test</div>;
};

export default App;
