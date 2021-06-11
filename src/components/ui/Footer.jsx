import React from "react";
import Text from "../typography/Text";

const Footer = () => {
	return (
		<>
			<hr />
			<footer>
				<Text className='p--2'>&copy; {new Date().getFullYear()}</Text>
			</footer>
		</>
	);
};

export default Footer;
