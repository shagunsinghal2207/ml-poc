import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { WidgetComponent } from '../widget/widget.component'
import { ChartService } from "app/chart.service";
import { DatabaseService } from "app/database.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  interval: any;
  widgets = [];

  constructor(private layout: LayoutService, private chart_service: ChartService, private dbService: DatabaseService) { }

  ngOnInit() {
    this.widgets = this.layout.getWidgetLayout();
    this.initData = this.initData.bind(this);
    this.initData();
    this.interval = setInterval(this.initData, 30 * 1000);
  }
  initData() {
    this.chart_service.getChartList().subscribe(result => {
      this.prepareWidgetData(0, result);
    });

    this.chart_service.getAvailaibleChartList().subscribe(result => {
      this.prepareWidgetData(1, result);
    });

    this.barChart();

    this.dbService.getRecent().subscribe(result => {
      this.prepareWidgetData(3, result);
    });
  }

  prepareWidgetData(i: any, data: any) {
    this.widgets[i].widgetData = data;
  }

  barChart() {
    let data;
    data = [
      {
        key: "Cumulative Return",
        values: [
          {
            "label": "App-Server",
            "value": 20
          },
          {
            "label": "Documents",
            "value": 10
          },
          {
            "label": "Extensions",
            "value": 50
          },
          {
            "label": "Fab",
            "value": 70
          },
        ]
      }
    ]
    this.widgets[2]['widgetData'] = data;

  }
  getWidgetClasses(widget) {
    let styles = "w-" + widget.width + ' h-' + widget.height;
    styles = (widget.settings.type == 'links' ? 'links' : 'widget') + ' ' + styles;
    return styles;
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
