import { useEffect, useState } from "react";
import { canUseDOM } from "../helpers/functions";
import { useDebounce } from "./useDebounce";

export const useWindowResize = (delay = 1) => {
	const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

	useEffect(() => {
		if (!canUseDOM) return;

		const handleResize = () => {
			setDimensions(() => ({ width: window.innerWidth, height: window.innerHeight }));
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	const debouncedWindowDimensions = useDebounce(dimensions, delay);

	return debouncedWindowDimensions;
};
