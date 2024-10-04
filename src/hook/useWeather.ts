import { SearchType, Weather } from "@/types";
import axios from "axios";
import { useMemo, useState } from "react";

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({} as Weather);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    setLoading(true);
    setWeather({} as Weather);

    try {
      const appid = import.meta.env.VITE_API_KEY;

      const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`;

      const { data } = await axios.get(geoURL);

      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;

      const { data: weatherResult } = await axios.get<Weather>(weatherUrl);

      setWeather(weatherResult);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return { fetchWeather, weather, hasWeatherData, loading, notFound };
}
