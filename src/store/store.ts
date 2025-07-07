import todayWeatherReducer from "./todayWeatherSlice";
import weeklyWeatherReducer from "./weeklyWeatherSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    todayWeather: todayWeatherReducer,
    weeklyWeather: weeklyWeatherReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
