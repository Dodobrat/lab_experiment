import {
	Breakpoints,
	FlavorOptions,
	FlexAlignOptions,
	FlexColOptions,
	FlexDirectionOptions,
	FlexJustifyOptions,
	FlexWrapOptions,
	SizeOptions,
} from "./classNameHelpers";

export const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

export const warn = (prop) => console.warn(`Invalid prop "${prop[0]}" with value ${JSON.stringify(prop[1])} supplied to component.`);

export const addElementAttributes = (component, props) => {
	if (component === "button") {
		props["role"] = "button";
		if (props["href"]) {
			props["target"] = "_blank";
			props["rel"] = "noopener";
			return "a";
		}
		return component;
	} else {
		if (props?.["onClick"] || props?.["to"]) {
			props["role"] = "button";
			return component;
		}
		if (props?.["href"]) {
			props["target"] = "_blank";
			props["rel"] = "noopener";
			return "a";
		}
		return component;
	}
};

//Util Generators
export const generateSpacingClasses = (prop, prefix) => {
	if (prop) {
		if (typeof prop === "object") {
			return Object.entries?.(prop)
				.map((item) => {
					if (SizeOptions.includes(item?.[1]?.toString())) {
						return `dui__flex--${prefix}-${item[0]}-${item[1]}`;
					}
					warn([prefix, prop]);
					return "";
				})
				.join(" ");
		}
		if (typeof prop === "string" && (SizeOptions.includes(prop) || prop === "none")) {
			return `dui__flex--${prefix}-${prop}`;
		}
		warn([prefix, prop]);
		return "";
	}
};

export const generateStyleClasses = (props = {}) => {
	const allowedClassnameValues = new Map([
		["align", FlexAlignOptions],
		["justify", FlexJustifyOptions],
		["direction", FlexDirectionOptions],
		["wrap", FlexWrapOptions],
		["col", FlexColOptions],
		["flavor", FlavorOptions],
		["sizing", SizeOptions],
	]);

	const propsEntries = Object.entries(props);
	let validClassnames = [];

	for (const prop of propsEntries) {
		if (prop[1] && typeof prop[1] === "string") {
			if (allowedClassnameValues.get(prop[0])?.includes(prop[1])) {
				validClassnames.push(`${prop[0]}--${prop[1]}`);
			} else {
				warn(prop);
			}
		}
		if (prop[1] && typeof prop[1] === "object") {
			const propEntries = Object.entries(prop[1]);
			for (const entry of propEntries) {
				if (Breakpoints.includes(entry[0])) {
					if (entry[1] && typeof entry[1] === "string" && allowedClassnameValues.get(prop[0])?.includes(entry[1])) {
						validClassnames.push(`${prop[0]}--${entry[0]}--${entry[1]}`);
					}
				} else {
					warn(prop);
				}
			}
		}
	}

	return validClassnames.join(" ");
};
