import { Weather } from '@/types';
import { formatTemperature } from '@/utils';

type WeatherDetailsProps = {
  weather: Weather;
};

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div className="bg-white text-black rounded-2xl text-center p-4">
      <h2 className="font-bold text-2xl">Clima de: {weather.name}</h2>
      <p className="text-8xl font-black">
        {formatTemperature(weather.main.temp)}&deg;C
      </p>
      <div className="flex justify-center gap-20 mt-3">
        <p className="font-black">
          Min:{' '}
          <span className="font-normal">
            {formatTemperature(weather.main.temp_min)}&deg;C
          </span>
        </p>
        <p className="font-black">
          Max:{' '}
          <span className="font-normal">
            {formatTemperature(weather.main.temp_max)}&deg;C
          </span>
        </p>
      </div>
    </div>
  );
}
