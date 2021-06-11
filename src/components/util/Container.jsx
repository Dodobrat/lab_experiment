import React from "react";
import cn from "classnames";

const Container = (props) => {
	const { children, className, ...rest } = props;

	return (
		<div className={cn("lab__container", className)} {...rest}>
			{children}
		</div>
	);
};

export default Container;
