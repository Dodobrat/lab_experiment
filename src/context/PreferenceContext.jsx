import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const PreferencesContext = createContext();

const PreferenceContextProvider = ({ children }) => {
	const [storedThreadPermission, setStoredThreadPermission] = useLocalStorage("lab_toggle_threads", false);

	const [threadPermission, setThreadPermission] = useState(storedThreadPermission);

	const toggleThreadPermission = () =>
		setThreadPermission((prev) => {
			setStoredThreadPermission(!prev);
			return !prev;
		});

	const threadValue = useMemo(() => ({ threadPermission, setThreadPermission }), [threadPermission, setThreadPermission]);

	return (
		<PreferencesContext.Provider
			value={{
				threadValue,
				toggleThreadPermission,
			}}>
			{children}
		</PreferencesContext.Provider>
	);
};

export const usePreference = () => {
	const context = useContext(PreferencesContext);

	if (context === undefined) {
		throw new Error("usePreference must be used within a PreferenceContextProvider");
	}

	return context;
};

export default PreferenceContextProvider;
