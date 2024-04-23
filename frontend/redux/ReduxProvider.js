"use client";
import { Provider } from "react-redux";
// import { store, persistor } from "./persist/configureStore";
// import { PersistGate } from "redux-persist/integration/react";
// import { store } from "./persist/index";
import { persistStore } from "redux-persist";
import { makeStore, store } from "./store";
import { useRef } from "react";
import { login } from "./slices/authSlice";
// persistStore(store);
function ReduxProvider({ children }) {
	const storeRef = useRef();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
		// storeRef.current.dispatch(
		// 	login(
		// 		localStorage.getItem("userData")
		// 			? JSON.parse(localStorage.getItem("userData"))
		// 			: null
		// 	)
		// );
	}
	return (
		<Provider store={storeRef.current}>
			{/* <PersistGate
				loading={<h1>Loading</h1>}
				persistor={persistor}
			>
		</PersistGate> */}
			{children}
		</Provider>
	);
}

export default ReduxProvider;
