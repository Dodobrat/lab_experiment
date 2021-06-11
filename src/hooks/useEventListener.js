import { useEffect, useRef } from "react";
import { canUseDOM } from "../helpers/functions";

export const useEventListener = (e, handler, eventOptions, el = window) => {
	const savedHandler = useRef(null);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		if (!canUseDOM) return;

		if (el) {
			const eventListener = (event) => savedHandler.current(event);

			el.addEventListener(e, eventListener, eventOptions);

			return () => {
				el.removeEventListener(e, eventListener, eventOptions);
			};
		}
	}, [e, el, eventOptions]);
};
