import React, { useMemo } from "react";
import { useThreads } from "./actions/fetchHooks";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import Container from "./components/util/Container";

const App = () => {
	const { data, isFetching } = useThreads();

	const fetchedData = useMemo(() => {
		if (data) {
			return data;
		}
		return [];
	}, [data]);

	console.log(fetchedData);

	return (
		<main>
			<Container className='p--2'>
				<Header />
				<article>{isFetching ? "Loading..." : "Data"}</article>
				<Footer />
			</Container>
		</main>
	);
};

export default App;
