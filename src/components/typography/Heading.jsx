import React from "react";
import cn from "classnames";
import { addElementAttributes } from "../../helpers/functions";

const Heading = (props) => {
	const { children, className, as = "h1", ...rest } = props;

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent className={cn("lab__heading", className)} {...rest}>
			{children}
		</ParsedComponent>
	);
};

export default Heading;
