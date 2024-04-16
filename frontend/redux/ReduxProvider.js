"use client";
import { Provider } from "react-redux";
import { store, persistor } from "./persist/configureStore";
import { PersistGate } from "redux-persist/integration/react";
function ReduxProvider({ children }) {
	return (
		<Provider store={store}>
			<PersistGate
				loading={<h1>Loading</h1>}
				persistor={persistor}
			>
				{children}
			</PersistGate>
		</Provider>
	);
}

export default ReduxProvider;
