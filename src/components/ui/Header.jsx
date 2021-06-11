import React, { useCallback } from "react";
import { IconMoon, IconSun } from "../../assets/icons";
import { useDarkMode } from "../../hooks/useDarkMode";
import Heading from "../typography/Heading";
import Flex from "../util/Flex";
import Button from "./Button";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const headerVariants = {
	hidden: {
		y: -100,
		opacity: 0,
	},
	show: {
		opacity: 1,
		y: 0,
	},
};

const toggleVariants = {
	hidden: {
		scale: 0,
		rotate: 180,
	},
	show: {
		scale: 1,
		rotate: 0,
		transition: {
			delay: 1,
		},
	},
	enlarge: {
		scale: 1.25,
	},
};

const Header = () => {
	const [isDark, setIsDark] = useDarkMode();

	const toggleDarkMode = useCallback(() => setIsDark((prev) => !prev), [setIsDark]);

	return (
		<motion.div variants={headerVariants} initial='hidden' animate='show'>
			<Flex align='center' className='py--2' as='header'>
				<Flex.Col>
					<Heading as='h6' className='bgtext--contrastColor mb--0'>
						Lab08 Thread
					</Heading>
				</Flex.Col>
				<Flex.Col col='auto'>
					<MotionButton
						flavor='round'
						className='lab__contrast-btn'
						onClick={toggleDarkMode}
						variants={toggleVariants}
						whileHover='enlarge'
						initial='hidden'
						animate='show'>
						{isDark ? <IconSun className='lab__icon' /> : <IconMoon className='lab__icon' />}
					</MotionButton>
				</Flex.Col>
			</Flex>
			<hr />
		</motion.div>
	);
};

export default Header;
