import React from "react";
import cn from "classnames";
import { addElementAttributes } from "../../helpers/functions";

const Text = (props) => {
	const { children, className, as = "p", ...rest } = props;

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent className={cn("lab__text", className)} {...rest}>
			{children}
		</ParsedComponent>
	);
};

export default Text;
