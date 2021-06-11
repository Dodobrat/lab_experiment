import React, { forwardRef } from "react";
import { addElementAttributes, generateStyleClasses } from "../../helpers/functions";
import cn from "classnames";

export const FlexCol = forwardRef((props, ref) => {
	const { className, as = "div", order, col, children, style, ...rest } = props;

	const classDefaults = {
		col,
	};

	const classBase = "dui__flex__col";

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent
			className={cn(classBase, generateStyleClasses(classDefaults), className)}
			ref={ref}
			style={{ ...style, order }}
			{...rest}>
			{children}
		</ParsedComponent>
	);
});

FlexCol.displayName = "FlexCol";
