import React, { useCallback, useState } from "react";
import { useEventListener } from "../../hooks/useEventListener";
import Button from "../ui/Button";
import cn from "classnames";
import { IconArrowUp } from "../../assets/icons";
import { motion, AnimatePresence } from "framer-motion";

const scrollDistanceTrigger = 200;

const backToTopVariants = {
	hidden: {
		scale: 0,
	},
	show: {
		scale: 1,
	},
	enlarge: {
		scale: 1.25,
	},
};

const BackToTop = (props) => {
	const { children, className, ...rest } = props;

	const [showScroll, setShowScroll] = useState(false);

	const handler = useCallback(() => {
		if (!showScroll && window.pageYOffset > scrollDistanceTrigger) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= scrollDistanceTrigger) {
			setShowScroll(false);
		}
	}, [showScroll]);

	useEventListener("scroll", handler);

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{showScroll && (
				<motion.div
					className={cn("lab__top", className)}
					variants={backToTopVariants}
					whileHover='enlarge'
					initial='hidden'
					animate='show'
					exit='hidden'
					style={{ zIndex: 99 }}>
					<Button flavor='round' onClick={scrollTop} className={cn("lab__contrast-btn", className)} {...rest}>
						{children ?? <IconArrowUp className='lab__icon' />}
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default BackToTop;
