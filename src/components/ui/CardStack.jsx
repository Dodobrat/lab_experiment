import React, { useCallback, useMemo, useState } from "react";
import { parseExceptFirstThread, parseThread, randomId } from "../../helpers/functions";
import Card from "./Card";
import cn from "classnames";
import Badge from "./Badge";

const CardStack = (props) => {
	const { data, children, className, ...rest } = props;

	const [isExpanded, setIsExpanded] = useState(false);

	const toggleCollapse = useCallback(() => {
		setIsExpanded((prev) => !prev);
	}, []);

	const threadCount = useMemo(() => data.length, [data]);
	const thread = useMemo(() => parseThread(data), [data]);
	const otherThreads = useMemo(() => parseExceptFirstThread(data), [data]);

	return (
		<div
			className={cn(
				"lab__card__stack",
				{
					"lab__card__stack--active": isExpanded,
				},
				className
			)}
			{...rest}>
			<Badge
				className={cn({
					"bg--highBg": thread.score >= 6,
					"bg--lowBg": thread.score <= 5,
				})}>
				{threadCount} Messages
			</Badge>
			<Card data={thread} onClick={toggleCollapse} />
			{isExpanded && (
				<>
					{otherThreads.map((entry) => {
						return <Card key={randomId()} data={entry} className='mt--2' />;
					})}
				</>
			)}
		</div>
	);
};

export default CardStack;
