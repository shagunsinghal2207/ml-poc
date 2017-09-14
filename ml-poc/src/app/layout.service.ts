import { Injectable, OnInit } from '@angular/core';
import { ChartService } from "app/chart.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LayoutService implements OnInit {
  chartServiceData: Array<object>;
  chart = [];
  tiles = [
    { text: 'Top', cols: 12, rows: 1, color: 'lightblue' },
    { text: 'Menu', cols: 1, rows: 8, color: 'lightgreen' },
    { text: 'Content', cols: 11, rows: 8, color: 'lightpink' },
  ];

  widgets = [
    { id: 0, title: 'Request Rate Trend', height: 2, width: 1, settings: { type: 'chart' } },
    { id: 1, title: 'DB Availability Trend', height: 2, width: 1, settings: { type: 'chart' } },
    { id: 2, title: 'Memory Uses(Top 5)', height: 2, width: 1, settings: { type: 'chart' } },
    { id: 3, title: '', height: 2, width: 1, settings: { type: 'links' } },
  ];

  constructor(private chart_service: ChartService) { }

  ngOnInit(): void {
  }

  getMainLayout() {
    return this.tiles;
  }

  getWidgetLayout() {
    return this.widgets;
  }
}
