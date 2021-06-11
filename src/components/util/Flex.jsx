import React from "react";
import cn from "classnames";
import { addElementAttributes, generateSpacingClasses, generateStyleClasses } from "../../helpers/functions";
import { FlexCol } from "./FlexCol";

const Flex = (props) => {
	const {
		children,
		className,
		as = "div",
		spacingX = "sm",
		spacingY = "sm",
		align = "stretch",
		justify = "flex-start",
		direction = "row",
		wrap = "wrap",
		disableNegativeSpace = false,
		...rest
	} = props;

	const classDefaults = {
		align,
		justify,
		direction,
		wrap,
	};

	const ParsedComponent = addElementAttributes(as, rest);

	return (
		<ParsedComponent
			className={cn(
				"dui__flex",
				{
					"dui__flex--no-negative": disableNegativeSpace,
				},
				generateSpacingClasses(spacingX, "sx"),
				generateSpacingClasses(spacingY, "sy"),
				generateStyleClasses(classDefaults),
				className
			)}
			{...rest}>
			{children}
		</ParsedComponent>
	);
};

Flex.Col = FlexCol;

export default Flex;
