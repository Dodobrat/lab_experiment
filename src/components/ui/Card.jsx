import React, { useMemo } from "react";
import { parseDate, parseThread } from "../../helpers/functions";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Flex from "../util/Flex";
import cn from "classnames";

const Card = (props) => {
	const { data, children, className, ...rest } = props;

	const thread = useMemo(() => parseThread(data), [data]);

	return (
		<Flex disableNegativeSpace className={cn("lab__card p--3", className)} wrap='nowrap' {...rest}>
			<Flex.Col col={{ base: null, md: "8", lg: "9" }}>
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
			</Flex.Col>
			<Flex.Col col={{ base: null, md: "4", lg: "3" }} className='lab__card__meta'>
				<Text className='bgtext--contrastColor mb--1'>{thread?.team}</Text>
				<Text as='small'>{parseDate(thread?.created_at)}</Text>
			</Flex.Col>
		</Flex>
	);
};

export default Card;
