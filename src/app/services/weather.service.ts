import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather'
import { Location, CurrentLocation } from '../models/location'

@Injectable()
export class WeatherService {

  location_apiKey = "AIzaSyCXdwtBvnGS6bXw5BEwoJJ0GaYQRS8VgDc"
  weather_apiKey = "658f7ed9c4d02fdd3fdceee8efd71e25"

  constructor(private http: HttpClient) { }

  getLocation(searchString: string) : Observable<Location> {
    return this.http.get<Location>("https://maps.googleapis.com/maps/api/geocode/json?address=" + searchString + "&key=" + this.location_apiKey)
  }

  getWeather(lattitude: number, longitude: number) : Observable<Weather> {
    var locationString = lattitude + "," + longitude
    return this.http.get<Weather>("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + this.weather_apiKey + "/" + locationString)
  }

}
