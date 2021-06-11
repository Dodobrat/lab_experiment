import React, { forwardRef, useMemo } from "react";
import { parseDate, parseThread } from "../../helpers/functions";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Flex from "../util/Flex";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { usePreference } from "../../context/PreferenceContext";

const MotionCol = motion(Flex.Col);

const colRevealVariants = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
	},
};

const Card = forwardRef((props, ref) => {
	const { data, children, isTriggerCard = false, isExpanded = false, className, ...rest } = props;

	const {
		threadValue: { threadPermission },
	} = usePreference();

	const thread = useMemo(() => parseThread(data), [data]);

	const canHaveHover = useMemo(() => {
		if (threadPermission) {
			return true;
		}
		if (!threadPermission && !isExpanded) {
			return true;
		}
	}, [threadPermission, isExpanded]);

	return (
		<Flex
			disableNegativeSpace
			className={cn(
				"lab__card p--3",
				{
					"lab__card--low": canHaveHover && isTriggerCard && (thread?.score <= 5 || !thread?.score),
					"lab__card--high": canHaveHover && isTriggerCard && thread?.score >= 6,
				},
				className
			)}
			wrap='nowrap'
			{...rest}
			ref={ref}>
			<AnimatePresence>
				<>
					<MotionCol
						col={{ base: null, md: "8", lg: "9" }}
						variants={colRevealVariants}
						initial='hidden'
						animate='show'
						exit='hidden'>
						<Heading
							as='p'
							className={cn({
								"bgtext--lowColor": thread?.score <= 5 || !thread?.score,
								"bgtext--highColor": thread?.score >= 6,
							})}>
							{thread?.subject}
						</Heading>
						<Text>{thread?.question}</Text>
						<Text className='bgtext--contrastColor mb--0'>{thread?.text}</Text>
					</MotionCol>
					<MotionCol
						col={{ base: null, md: "4", lg: "3" }}
						className='lab__card__meta'
						variants={colRevealVariants}
						initial='hidden'
						animate='show'
						exit='hidden'>
						<Text className='bgtext--contrastColor mb--1'>{thread?.team}</Text>
						<Text as='small'>{parseDate(thread?.created_at)}</Text>
					</MotionCol>
				</>
			</AnimatePresence>
		</Flex>
	);
});

export default Card;
