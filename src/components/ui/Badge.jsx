import React, { forwardRef } from "react";
import { addElementAttributes } from "../../helpers/functions";
import cn from "classnames";

const Badge = forwardRef((props, ref) => {
	const { className, as = "span", children, ...rest } = props;

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent className={cn("lab__badge", className)} ref={ref} {...rest}>
			{children}
		</ParsedComponent>
	);
});

export default Badge;
