export const SizeOptions = ["xs", "sm", "md", "lg", "xl"];
export const Breakpoints = ["base", "sm", "md", "lg"];
export const FlavorOptions = ["default", "rounded", "round"];
//Flex Specific
export const FlexAlignOptions = ["stretch", "flex-start", "flex-end", "center", "baseline"];
export const FlexJustifyOptions = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"];
export const FlexDirectionOptions = ["row", "row-reverse", "column", "column-reverse"];
export const FlexWrapOptions = ["nowrap", "wrap", "wrap-reverse"];

const cols = Array.from(new Array(12), (_, idx) => `${idx + 1}`);
export const FlexColOptions = [...cols, "auto"];
