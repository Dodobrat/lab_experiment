import React, { useCallback, useState } from "react";
import { useEventListener } from "../../hooks/useEventListener";
import Button from "../ui/Button";
import cn from "classnames";
import { IconArrowUp } from "../../assets/icons";

const scrollDistanceTrigger = 200;

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
		<div className={cn("lab__top", className)}>
			{showScroll && (
				<Button flavor='round' onClick={scrollTop} className={cn("lab__contrast-btn", className)} {...rest}>
					{children ?? <IconArrowUp className='lab__icon' />}
				</Button>
			)}
		</div>
	);
};

export default BackToTop;
