import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { parseExceptFirstThread, parseThread, randomId } from "../../helpers/functions";
import Card from "./Card";
import cn from "classnames";
import Badge from "./Badge";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useWindowResize } from "../../hooks/useWindowResize";
import { usePreference } from "../../context/PreferenceContext";

const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

const badgeVariants = {
	hidden: {
		y: 0,
		opacity: 0,
		scale: 0.75,
	},
	show: {
		y: -12.5,
		opacity: 1,
		scale: 1,
	},
	exit: {
		y: -12.5,
		opacity: 0,
		scale: 0,
	},
};

const CardStack = (props) => {
	const { data, children, className, ...rest } = props;

	const {
		threadValue: { threadPermission },
	} = usePreference();

	const { width } = useWindowResize(250);

	const collapseTriggerRef = useRef(null);

	const [isExpanded, setIsExpanded] = useState(false);
	const [blankCardHeight, setBlankCardHeight] = useState(0);

	const toggleCollapse = useCallback(() => {
		if (threadPermission) {
			return setIsExpanded((prev) => !prev);
		} else {
			return setIsExpanded(true);
		}
	}, [threadPermission, setIsExpanded]);

	const threadCount = useMemo(() => data.length, [data]);
	const thread = useMemo(() => parseThread(data), [data]);
	const otherThreads = useMemo(() => parseExceptFirstThread(data), [data]);

	useLayoutEffect(() => {
		const mainCardHeight = collapseTriggerRef.current?.getBoundingClientRect().height;
		setBlankCardHeight(mainCardHeight);
	}, [isExpanded, width]);

	const handleKeyDown = (e) => {
		if (collapseTriggerRef.current === document.activeElement && e.code === "Space") {
			e.preventDefault();
			toggleCollapse();
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				className={cn(
					"lab__card__stack",
					{
						"lab__card__stack--active": isExpanded,
					},
					className
				)}
				animate={{
					height: !isExpanded ? blankCardHeight : blankCardHeight * threadCount + (threadCount - 1) * 10,
				}}
				{...rest}>
				<AnimatePresence>
					{!isExpanded && (
						<MotionBadge
							className={cn({
								"bg--highBg": thread.score >= 6,
								"bg--lowBg": thread.score <= 5,
							})}
							variants={badgeVariants}
							initial='hidden'
							exit='exit'
							animate='show'
							style={{ zIndex: threadCount + 1 }}>
							{threadCount} Messages
						</MotionBadge>
					)}
				</AnimatePresence>

				<MotionCard
					data={thread}
					onClick={toggleCollapse}
					ref={collapseTriggerRef}
					style={{ zIndex: threadCount }}
					tabIndex={threadPermission ? "0" : !threadPermission && !isExpanded ? "0" : "-1"}
					isTriggerCard
					isExpanded={isExpanded}
					onKeyDown={handleKeyDown}
					aria-expanded={isExpanded}
				/>

				<AnimatePresence>
					<AnimateSharedLayout>
						{isExpanded ? (
							<>
								{otherThreads.map((entry, idx) => {
									return (
										<MotionCard data={entry} key={randomId()} className='mt--2' initial={false} layoutId={idx + 1} />
									);
								})}
							</>
						) : (
							<>
								{otherThreads.map((entry, idx) => {
									return (
										<motion.div
											key={randomId()}
											layoutId={idx + 1}
											className='lab__card lab__card__blank'
											style={{
												height: `${blankCardHeight}px`,
												top: `${(idx + 1) * 10}px`,
												left: `${(idx + 1) * 10}px`,
												zIndex: threadCount - 1 - idx,
											}}
										/>
									);
								})}
							</>
						)}
					</AnimateSharedLayout>
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
};

export default CardStack;
