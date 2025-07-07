import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "c8b5c12356be9ad5b9cf64258f5d3fd6";

interface ForecastItem {
  main: {
    temp: number;
  };
  weather: { icon: string; description: string }[];
  dt_txt: string;
}

interface ForecastState {
  list: ForecastItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchWeeklyForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city: string) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data.list as ForecastItem[];
  }
);

const weeklyWeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeeklyForecast.fulfilled,
        (state, action: PayloadAction<ForecastItem[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchWeeklyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default weeklyWeatherSlice.reducer;
