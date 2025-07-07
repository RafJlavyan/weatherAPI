import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherState {
  id: number | null;
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WeatherState = {
  id: null,
  name: "",
  weather: [],
  main: null,
  status: "idle",
  error: null,
};

export const fetchTodayWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    const API_KEY = "c8b5c12356be9ad5b9cf64258f5d3fd6";
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    return response.data;
  }
);

const todayWeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodayWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.weather = action.payload.weather;
        state.main = {
          ...action.payload.main,
          temp: Math.round(action.payload.main.temp - 273.15), // in order to show as degree
        };
      })
      .addCase(fetchTodayWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default todayWeatherSlice.reducer;
