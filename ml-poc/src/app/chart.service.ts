import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChartService {
  private service_url = "http://localhost:3000/";
  constructor(private http: Http) { }

  getChartList(): Observable<any[]> {
    const currentDate = new Date();
    let endDate = new Date(currentDate.getTime()).toISOString();
    let startDate = new Date(currentDate.getTime() - (30 * 60 * 1000)).toISOString();

    let dataPointsCount = '10';

    return this.http.get(this.service_url + 'requestTrend?startDate=' + startDate + '&endDate=' + endDate + '&dataPointsCount=' + dataPointsCount)
      .map((response: Response) => response.json());
  }
  
  getAvailaibleChartList(): Observable<any[]> {
    const currentDate = new Date();
    let endDate = new Date(currentDate.getTime()).toISOString();
    let startDate = new Date(currentDate.getTime() - (30 * 60 * 1000)).toISOString();
    let dataPointsCount = '10';
    return this.http.get(this.service_url + 'requestAvailabilityTrend?startDate=' + startDate + '&endDate=' + endDate + '&dataPointsCount=' + dataPointsCount)
      .map((response: Response) => response.json());
  }
}
