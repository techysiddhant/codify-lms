"use client";
import { Provider } from "react-redux";
// import { store, persistor } from "./persist/configureStore";
// import { PersistGate } from "redux-persist/integration/react";
// import { store } from "./persist/index";
import { persistStore } from "redux-persist";
import { store } from "./store";
// persistStore(store);
function ReduxProvider({ children }) {
	return (
		<Provider store={store}>
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
