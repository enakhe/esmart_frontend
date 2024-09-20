import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "../features/authentication/login/authApiSlice";
import { hotelApiSlice } from "../features/hotel/hotelApiSlice";
import { productKeyApiSlice } from "../features/productkey/productKeyApiSlice";


const rootReducer = combineSlices(authApiSlice, hotelApiSlice, productKeyApiSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware().concat(authApiSlice.middleware, hotelApiSlice.middleware, productKeyApiSlice.middleware);
        },
        preloadedState,
    });
    setupListeners(store.dispatch);
    return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
