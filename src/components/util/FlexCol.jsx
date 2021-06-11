import React from "react";
import { addElementAttributes, generateStyleClasses } from "../../helpers/functions";
import cn from "classnames";

export const FlexCol = (props) => {
	const { className, as = "div", order, col, children, style, ...rest } = props;

	const classDefaults = {
		col,
	};

	const classBase = "dui__flex__col";

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent className={cn(classBase, generateStyleClasses(classDefaults), className)} style={{ ...style, order }} {...rest}>
			{children}
		</ParsedComponent>
	);
};

FlexCol.displayName = "FlexCol";
