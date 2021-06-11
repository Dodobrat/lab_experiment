import React, { forwardRef } from "react";
import cn from "classnames";
import { addElementAttributes, generateStyleClasses } from "../../helpers/functions";

const Button = forwardRef((props, ref) => {
	const {
		className,
		as = "button",
		flavor = "default",
		sizing = "md",
		keyboardFocusRing = true,
		spongy = true,
		children,
		...rest
	} = props;

	const classBase = "lab__btn";

	const classDefaults = {
		flavor,
		sizing,
	};

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent
			className={cn(
				classBase,
				generateStyleClasses(classDefaults),
				{
					[`${classBase}--spongy`]: spongy,
					[`${classBase}--accessible`]: keyboardFocusRing,
				},
				className
			)}
			ref={ref}
			{...rest}>
			{children}
		</ParsedComponent>
	);
});

export default Button;
