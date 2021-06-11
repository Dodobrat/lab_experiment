import React from "react";
import { usePreference } from "../../context/PreferenceContext";
import Text from "../typography/Text";
import Flex from "../util/Flex";
import Button from "./Button";

const Footer = () => {
	const {
		threadValue: { threadPermission },
		toggleThreadPermission,
	} = usePreference();

	return (
		<>
			<hr />
			<footer>
				<Flex className='pt--3'>
					<Flex.Col>
						<Text className='py--2'>&copy; {new Date().getFullYear()}</Text>
					</Flex.Col>
					<Flex.Col col='auto'>
						Allow thread toggle: <Button onClick={toggleThreadPermission}>{threadPermission ? "Yes" : "No"}</Button>
					</Flex.Col>
				</Flex>
			</footer>
		</>
	);
};

export default Footer;
