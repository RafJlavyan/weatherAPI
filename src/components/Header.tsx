import { useSnapshot } from "valtio";
import { searchState } from "../valtioStore/store";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const snap = useSnapshot(searchState);
  const navigate = useNavigate();
  const [inputCity, setInputCity] = useState(snap.city);

  return (
    <Container>
      <SearchComponent>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            searchState.city = inputCity;
            navigate(`/${encodeURIComponent(inputCity)}`);
          }}
        >
          Search City
        </button>
      </SearchComponent>
      <SwitchType>
        <div>
          <input
            type="radio"
            checked={snap.unit === "metric"}
            onChange={() => {
              searchState.unit = "metric";
            }}
          />
          °C
        </div>
        <div>
          <input
            type="radio"
            checked={snap.unit === "imperial"}
            onChange={() => {
              searchState.unit = "imperial";
            }}
          />
          °F
        </div>
      </SwitchType>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  position: relative;
`;

const SwitchType = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  background-color: white;
  border-radius: 20px;
  padding: 5px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2px;

    input {
    }
  }
`;

const SearchComponent = styled.div`
  display: flex;
  gap: 2px;
  input {
    height: 20px;
  }
  button {
    border-radius: 0;
    outline: none;
    height: 20px;
    padding: 0 5px;
    background-color: white;
  }
`;
