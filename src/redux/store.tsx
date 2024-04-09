import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./auth/auth.slice";

const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
