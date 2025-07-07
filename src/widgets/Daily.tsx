import styled from "styled-components";
import { searchState } from "../valtioStore/store";
import { useSnapshot } from "valtio";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodayWeather } from "../store/todayWeatherSlice";
import { fetchWeeklyForecast } from "../store/weeklyWeatherSlice";
import type { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";

const Daily = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snap = useSnapshot(searchState);

  // Get today's current weather from the Redux store
  const todaysWeaather = useSelector((state: RootState) => state.todayWeather);

  // Get error from the Redux store
  const error = useSelector((state: RootState) => state.todayWeather.error);

  // Get 5-day / 3-hour interval forecast data from the Redux store
  const weekly = useSelector((state: RootState) => state.weeklyWeather);

  // Get selected day's date and filter forecast entries for that day (every 3 hours)
  const selectedDate = weekly.list?.[snap.selectedDayIndex * 8]?.dt_txt.split(" ")[0];
  const todayForecast = weekly.list?.filter((entry) =>
    entry.dt_txt.startsWith(selectedDate ?? "")
  );

  // Fetch current weather data on component mount or when city changes
  useEffect(() => {
    if (snap.city) {
      dispatch(fetchTodayWeather(snap.city));
    }
  }, [dispatch, snap.city]);

  // Fetch weekly forecast data on component mount or when city changes
  useEffect(() => {
    if (snap.city) {
      searchState.city = snap.city;
      console.log(searchState.city);
      dispatch(fetchWeeklyForecast(snap.city));
    }
  }, [dispatch, snap.city]);

  // Utility function to convert Celsius to Fahrenheit
  const displayTemp = (temp: number | undefined) => {
    if (typeof temp !== "number") return "";
    if (snap.unit === "imperial") {
      return `${Math.round((temp * 9) / 5 + 32)}°F`;
    }
    return `${Math.round(temp)}°C`;
  };

  return (
    <>
      {error && (
        <ErrorPopup>
          City not found: {snap.city}
        </ErrorPopup>
      )}
      <Container>
        {/* Display current weather: city, temp, icon, and description */}
        <Current>
          <h2>{todaysWeaather.name}</h2>
          <h2>{displayTemp(todaysWeaather.main?.temp)}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${todaysWeaather.weather[0]?.icon}.png`}
            alt=""
          />
          <p>{todaysWeaather.weather[0]?.description}</p>
        </Current>
        {/* Display today's hourly forecast: time and temperature */}
        <Hourly>
          {todayForecast?.map((entry, index) => {
            const time = entry.dt_txt.split(" ")[1].slice(0, 5); // Extract "HH:MM"
            return (
              <div key={index}>
                <p>{time}</p>
                <p>{displayTemp(entry.main.temp)}</p>
              </div>
            );
          })}
        </Hourly>
      </Container>
    </>
  );
};

export default Daily;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50vh;
`;
const Current = styled.div`
  text-align: center;

  img {
    width: 100px;
  }
`;
const Hourly = styled.div`
  width: 13%;

  > div {
    display: flex;
    justify-content: center;
    gap: 10px;
    border-bottom: 1px solid grey;
    padding: 10px 20px;
  }
`;

const ErrorPopup = styled.div`
  background: #e53935;
  color: #fff;
  padding: 16px 24px;
  border-radius: 6px;
  margin-bottom: 16px;
  text-align: center;
  font-weight: bold;
`;
