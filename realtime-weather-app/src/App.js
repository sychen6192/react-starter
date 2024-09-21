import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getMoment } from './utils/helpers';
import WeatherCard from './views/WeatherCard';


const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

const Container = styled.div`
  background-color: ${({theme}) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const API_KEY = process.env.REACT_APP_CWB_API_AUTH_KEY
const LOCATION_NAME = '臺北'
const LOCATION_NAME_FORECAST = '臺北市';

const fetchWeatherForecast = () => {
  return fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${LOCATION_NAME_FORECAST}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );
      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      };
    });
  }

  const fetchCurrentWeather = () => {
    return fetch(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${API_KEY}&StationName=${LOCATION_NAME}`)
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.Station[0];
      return {
        observationTime: locationData.ObsTime.DateTime,
        locationName: locationData.StationName,
        temperature: locationData.WeatherElement.AirTemperature,
        windSpeed: locationData.WeatherElement.WindSpeed,
      };  
    });
  }


const App = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
  });
  const moment = useMemo(() => getMoment(LOCATION_NAME_FORECAST), []);

  const fetchData = useCallback(async () => {
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true
    }));
    const [currentWeather, weatherForecast] = await Promise.all([
      fetchCurrentWeather(),
      fetchWeatherForecast(),
    ]);
    setWeatherElement({
      ...currentWeather,
      ...weatherForecast,
      isLoading: false,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light': 'dark');
  },[moment]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard 
          weatherElement={weatherElement}
          moment={moment}
          fetchData={fetchData}/>
      </Container>
    </ThemeProvider>
  );
};

export default App;