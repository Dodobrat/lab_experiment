import React, { useCallback } from "react";
import { IconMoon, IconSun } from "../../assets/icons";
import { useDarkMode } from "../../hooks/useDarkMode";
import Heading from "../typography/Heading";
import Flex from "../util/Flex";
import Button from "./Button";

const Header = () => {
	const [isDark, setIsDark] = useDarkMode();

	const toggleDarkMode = useCallback(() => setIsDark((prev) => !prev), [setIsDark]);

	return (
		<>
			<Flex align='center' className='py--2' as='header'>
				<Flex.Col>
					<Heading as='h6' className='bgtext--contrastColor mb--0'>
						Lab08 Thread
					</Heading>
				</Flex.Col>
				<Flex.Col col='auto'>
					<Button flavor='round' className='lab__contrast-btn' onClick={toggleDarkMode}>
						{isDark ? <IconSun className='lab__icon' /> : <IconMoon className='lab__icon' />}
					</Button>
				</Flex.Col>
			</Flex>
			<hr />
		</>
	);
};

export default Header;
