import { searchState } from "../valtioStore/store";
import { useSnapshot } from "valtio";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { fetchWeeklyForecast } from "../store/weeklyWeatherSlice";

const Weekly = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weekly = useSelector((state: RootState) => state.weeklyWeather);
  const snap = useSnapshot(searchState);

  useEffect(() => {
    // Fetches the weekly forecast data when the city changes
    if (snap.city) {
      searchState.city = snap.city;
      console.log(searchState.city);
      dispatch(fetchWeeklyForecast(snap.city));
    }
  }, [dispatch, snap.city]);

  // Filters every 8th forecast entry to represent daily data
  const dailyData = weekly.list
    ?.filter((_, index) => index % 8 === 0)
    .slice(0, 5);

  // Converts temperatures from Celsius to Fahrenheit if needed
  const displayTemp = (tempC: number) => {
    if (snap.unit === "imperial") {
      return `${Math.round((tempC * 9) / 5 + 32)}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  return (
    <Container>
      {/* Maps over daily forecast data to render each day's weather */}
      {dailyData?.map((day, index) => {
        const date = day.dt_txt.split(" ")[0].slice(5);
        const icon = day.weather[0].icon;
        return (
          <Days
            key={index}
            className={index === snap.selectedDayIndex ? "active" : ""}
            onClick={() => (searchState.selectedDayIndex = index)}
          >
            <Day>
              <p>{date}</p>
              <div>
                <h3>{displayTemp(day.main.temp)}</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}.png`}
                  alt=""
                />
              </div>
            </Day>
          </Days>
        );
      })}
    </Container>
  );
};

export default Weekly;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
`;

const Days = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Day = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 130px;
  height: 80px;
  border: 1px solid #eaeaea;

  img {
    width: 40px;
  }

  > div {
    display: flex;
    align-items: center;
  }

  .active & {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;
