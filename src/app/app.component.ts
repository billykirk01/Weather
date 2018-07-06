import { Component, OnInit } from '@angular/core';
import { Currently, HourlyData, DailyData, Weather } from './models/weather'
import { WeatherService } from './services/weather.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  currentWeather: Currently
  hourlyWeather: HourlyData[]
  dailyWeather: DailyData[]

  formattedLocation: string

  doingLookup: boolean = true

  activeSummary: string
  activeCloudCover: number
  activeHumidity: number
  activePrecipiationProbability: number
  activePressure: number
  activeWindSpeed: number
  activeWindDirection: string
  activeVisibility: number
  activeUVIndex: number

  ngOnInit() {
    this.getWeather("95683")
  }

  getWeather(locationString: string) {
    this.weatherService.getLocation(locationString)
      .subscribe(location => {
        console.log(location)
        this.formattedLocation = location.results[0].formatted_address.replace(/[0-9]/g, '').replace(' ,', ',');
        this.weatherService.getWeather(location.results[0].geometry.location.lat, location.results[0].geometry.location.lng)
          .subscribe(weather => {
            console.log(weather)
            this.currentWeather = weather.currently
            this.hourlyWeather = weather.hourly.data
            this.dailyWeather = weather.daily.data
            this.buildActiveWeatherCurrent(weather)
            this.doingLookup = false
          })
      })
  }

  buildActiveWeatherCurrent(weather: Weather) {
    this.activeSummary = weather.currently.summary
    this.activeCloudCover = weather.currently.cloudCover
    this.activeHumidity = weather.currently.humidity
    this.activePrecipiationProbability = weather.currently.precipProbability
    this.activePressure = weather.currently.pressure
    this.activeWindSpeed = weather.currently.windSpeed
    this.activeWindDirection = this.getCardinal(weather.currently.windBearing)
    this.activeVisibility = weather.currently.visibility
    this.activeUVIndex = weather.currently.uvIndex
  }

  buildActiveWeatherHour(hour: HourlyData) {
    this.activeSummary = hour.summary
    this.activeCloudCover = hour.cloudCover
    this.activeHumidity = hour.humidity
    this.activePrecipiationProbability = hour.precipProbability
    this.activePressure = hour.pressure
    this.activeWindSpeed = hour.windSpeed
    this.activeWindDirection = this.getCardinal(hour.windBearing)
    this.activeVisibility = hour.visibility
    this.activeUVIndex = hour.uvIndex
  }

  buildActiveWeatherDay(day: DailyData) {
    this.activeSummary = day.summary
    this.activeCloudCover = day.cloudCover
    this.activeHumidity = day.humidity
    this.activePrecipiationProbability = day.precipProbability
    this.activePressure = day.pressure
    this.activeWindSpeed = day.windSpeed
    this.activeWindDirection = this.getCardinal(day.windBearing)
    this.activeVisibility = day.visibility
    this.activeUVIndex = day.uvIndex
  }

  getCardinal(angle) {
    //easy to customize by changing the number of directions you have 
    var directions = 8;

    var degree = 360 / directions;
    angle = angle + degree / 2;

    if (angle >= 0 * degree && angle < 1 * degree)
      return "N";
    if (angle >= 1 * degree && angle < 2 * degree)
      return "NE";
    if (angle >= 2 * degree && angle < 3 * degree)
      return "E";
    if (angle >= 3 * degree && angle < 4 * degree)
      return "SE";
    if (angle >= 4 * degree && angle < 5 * degree)
      return "S";
    if (angle >= 5 * degree && angle < 6 * degree)
      return "SW";
    if (angle >= 6 * degree && angle < 7 * degree)
      return "W";
    if (angle >= 7 * degree && angle < 8 * degree)
      return "NW";
    //Should never happen: 
    return "N";
  }

}


