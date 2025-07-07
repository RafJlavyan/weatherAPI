import { proxy } from "valtio";

export const searchState = proxy({
  city: "",
  unit: "metric",
  selectedDayIndex: 0,
});
