import FormClima from './components/Form';
import Spinner from './components/Spinner/Spinner';
import WeatherDetails from './components/WeatherDetails';
import useWeather from './hook/useWeather';

function App() {
  const { fetchWeather, weather, hasWeatherData, loading, notFound } =
    useWeather();

  return (
    <>
      <h1 className="text-center text-5xl mt-20 font-bold">
        Buscador de Clima
      </h1>

      <div className="w-[80%] mx-auto max-w-[100rem] md:grid md:grid-cols-2 md:items-center md:gap-16 md:mt-10">
        <FormClima fetchWeather={fetchWeather} />

        {loading && <Spinner />}

        {hasWeatherData && <WeatherDetails weather={weather} />}

        {notFound && (
          <p className="font-black text-center text-3xl">
            Ciudad no encontrada
          </p>
        )}
      </div>
    </>
  );
}

export default App;
