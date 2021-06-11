import { useState } from "react";
import { canUseDOM } from "../helpers/functions";

export const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (!canUseDOM) return;

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (err) {
			console.log(err);
			return initialValue;
		}
	});

	const setValue = (value) => {
		if (!canUseDOM) return;

		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (err) {
			console.log(err);
		}
	};

	return [storedValue, setValue];
};
