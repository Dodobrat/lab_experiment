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

//PARSE THREAD
export const parseThread = (data) => {
	let item = {};
	if (Array.isArray(data)) {
		item = data[0];
	} else {
		item = data;
	}

	if (item) {
		return {
			score: item.score ?? null,
			subject: item.subject ?? null,
			question: item.question ?? null,
			text: item.text ?? null,
			team: item.team ?? null,
			created_at: item.created_at ?? null,
		};
	}
	return {};
};

export const parseExceptFirstThread = (data) => {
	if (Array.isArray(data) && data.length > 1) {
		return data.filter((item, idx) => idx !== 0).map((entry) => parseThread(entry));
	}
	return [];
};

//PARSE DATE
export const attachNumberOrdinal = (number) => {
	let ordinal = "th";
	switch (number % 10) {
		case 1:
			ordinal = "st";
			break;
		case 2:
			ordinal = "nd";
			break;
		case 3:
			ordinal = "rd";
			break;
		default:
			ordinal = "th";
			break;
	}
	return `${number}${ordinal}`;
};

export const parseDate = (date) => {
	const parsedDate = new Date(date?.split(" ")[0]);

	const month = parsedDate.toLocaleString("default", { month: "long" }).substring(0, 3);
	const dateNumber = attachNumberOrdinal(parsedDate.getDate());

	return `${month} ${dateNumber}`;
};

//CHECK IF SSR [NOT NECCESSARY HERE but flexible for code re-use]
export const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

export const randomId = () => `${Math.random()}_${new Date().getTime()}`;

//WARNING
export const warn = (prop) => console.warn(`Invalid prop "${prop[0]}" with value ${JSON.stringify(prop[1])} supplied to component.`);

//ELEMENT TYPE ATTRIBUTES APPEND
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

//CLASSNAME GENERATION
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
