import { useEffect, useState } from "react";
import { canUseDOM } from "../helpers/functions";
import { useLocalStorage } from "./useLocalStorage";
import { usePrefersDarkMode } from "./usePrefersDarkMode";

export const useDarkMode = (props = {}) => {
	const { systemPreferenceFirst = true, element = document.documentElement, localStorageKey = "lab_dark_theme" } = props;

	const determineInitialValue = () => {
		if (localStorage[localStorageKey]) {
			return localStorage[localStorageKey];
		}
		if (systemPreferenceFirst) {
			return prefersDarkMode;
		}
		return false;
	};

	const prefersDarkMode = usePrefersDarkMode();
	const [isDark, setIsDark] = useLocalStorage(localStorageKey, determineInitialValue());
	const [el] = useState(element);

	useEffect(() => {
		if (!canUseDOM) return;

		if (!localStorage[localStorageKey] && systemPreferenceFirst) {
			el.setAttribute("dark-theme", prefersDarkMode.toString());

			return () => {
				el.removeAttribute("dark-theme");
			};
		}
	}, [prefersDarkMode, el, localStorageKey, systemPreferenceFirst]);

	useEffect(() => {
		if (!canUseDOM) return;

		el.setAttribute("dark-theme", isDark);

		return () => {
			el.removeAttribute("dark-theme");
		};
	}, [isDark, el]);

	return [isDark, setIsDark];
};
