import React from "react";
import { addElementAttributes } from "../../helpers/functions";
import cn from "classnames";

const Badge = (props) => {
	const { className, as = "span", children, ...rest } = props;

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent className={cn("lab__badge", className)} {...rest}>
			{children}
		</ParsedComponent>
	);
};

export default Badge;
