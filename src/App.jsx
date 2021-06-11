import React, { useMemo } from "react";
import { useThreads } from "./actions/fetchHooks";
import Card from "./components/ui/Card";
import CardStack from "./components/ui/CardStack";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import Loader from "./components/ui/Loader";
import BackToTop from "./components/util/BackToTop";
import Container from "./components/util/Container";
import Flex from "./components/util/Flex";

const App = () => {
	const { data, isFetching } = useThreads();

	const fetchedData = useMemo(() => {
		if (data) {
			return data;
		}
		return [];
	}, [data]);

	return (
		<main>
			<Container className='p--2'>
				<Header />
				{isFetching && (
					<div className='lab__loader__container py--4'>
						<Loader />
					</div>
				)}
				<Flex direction='column' wrap='nowrap' className='py--5' spacingY='md'>
					{fetchedData.map((thread) => {
						if (thread.length > 1) {
							return (
								<Flex.Col col='auto' key={thread[0].id}>
									<CardStack data={thread} />
								</Flex.Col>
							);
						}
						return (
							<Flex.Col col='auto' key={thread[0].id}>
								<Card data={thread} />
							</Flex.Col>
						);
					})}
				</Flex>
				<Footer />
				<BackToTop />
			</Container>
		</main>
	);
};

export default App;
