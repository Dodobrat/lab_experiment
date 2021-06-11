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
import { AnimatePresence, motion } from "framer-motion";
import PreferenceContextProvider from "./context/PreferenceContext";

const MotionFlex = motion(Flex);
const MotionCol = motion(Flex.Col);

const loaderVarinat = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	show: {
		opacity: 1,
		scale: 1,
	},
};

const threadItemVariant = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	show: {
		opacity: 1,
		y: 0,
	},
};

const threadListVariant = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const App = () => {
	const { data, isFetching } = useThreads();

	const fetchedData = useMemo(() => {
		if (data) {
			return data;
		}
		return null;
	}, [data]);

	return (
		<PreferenceContextProvider>
			<AnimatePresence>
				<main>
					<Container>
						<Flex className='lab__main__wrapper p--2' direction='column' spacingY={null} spacingX={null} wrap='nowrap'>
							<Flex.Col col='auto' className='w--100'>
								<Header />
							</Flex.Col>
							<Flex.Col>
								{isFetching && (
									<motion.div
										className='lab__loader__container py--4'
										variants={loaderVarinat}
										initial='hidden'
										animate='show'
										exit='hidden'>
										<Loader />
									</motion.div>
								)}
								{fetchedData && (
									<MotionFlex
										direction='column'
										wrap='nowrap'
										className='py--5'
										spacingY='md'
										variants={threadListVariant}
										initial='hidden'
										animate='show'>
										{fetchedData.map((thread, idx) => {
											if (thread.length > 1) {
												return (
													<MotionCol
														col='auto'
														key={thread[0].id}
														variants={threadItemVariant}
														style={{ zIndex: idx + 2 }}>
														<CardStack data={thread} />
													</MotionCol>
												);
											}
											return (
												<MotionCol
													col='auto'
													key={thread[0].id}
													variants={threadItemVariant}
													style={{ zIndex: idx + 2 }}>
													<Card data={thread} />
												</MotionCol>
											);
										})}
									</MotionFlex>
								)}
							</Flex.Col>
							<Flex.Col col='auto'>
								<Footer />
							</Flex.Col>
						</Flex>
						<BackToTop />
					</Container>
				</main>
			</AnimatePresence>
		</PreferenceContextProvider>
	);
};

export default App;
