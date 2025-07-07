import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Daily from "../widgets/Daily";
import Weekly from "../widgets/Weekly";
import { searchState } from "../valtioStore/store";

const ShowWeather = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const { city: paramCity } = params;

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      searchState.city = "";
    }
  }, []);

  useEffect(() => {
    if (paramCity) {
      searchState.city = paramCity;
    }
  }, [paramCity]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county;
          if (city) {
            searchState.city = city;
            console.log("Detected city:", city);
            navigate(`/${encodeURIComponent(city)}`);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  return (
    <Container>
      <Daily />
      <Weekly />
    </Container>
  );
};

export default ShowWeather;

const Container = styled.section``;
