import { useState, useEffect } from "react";
import { canUseDOM } from "../helpers/functions";

export const usePrefersDarkMode = () => {
	const colorMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");

	const [prefersDark, setPrefersDark] = useState(colorMatchMedia.matches);

	useEffect(() => {
		if (!canUseDOM) return;

		const determineMatch = () => {
			if (colorMatchMedia.matches) {
				setPrefersDark(true);
			} else {
				setPrefersDark(false);
			}
		};

		colorMatchMedia.addEventListener("change", determineMatch);

		return () => {
			colorMatchMedia.removeEventListener("change", determineMatch);
		};
	}, [colorMatchMedia]);

	return prefersDark;
};
