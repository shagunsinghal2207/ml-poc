import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() cData: any;
  @Input() chartType: any;
  chartData: any;
  options: any;

  color=['#ff7f0e','#667711','#2222ff','#2ca02c']

  chartOptions = {
    chart: {
      type: 'lineChart',
      height: 300,
      margin: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
      },
      useInteractiveGuideline: true,
      x: function (d) { return d.x; },
      y: function (d) { return d.y; },
      xAxis: { axisLabel: 'Time (ms)' },
      yAxis: {
        axisLabel: 'NO OF REQUESTS',
        tickFormat: function (d) {
          return d3.format('.02f')(d);
        },
        axisLabelDistance: -10
      }
    }
  };

  barChartOptions = {
    chart: {
      type: 'discreteBarChart',
      valueFormat: function (d) {
        return d3.format(',.4f')(d);
      },
      height: 300,
      margin: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
      },
      duration: 500,
      x: function (d) { return d.label; },
      y: function (d) { return d.value; },
      xAxis: {
        axisLabel: 'DATABASES'
      },
      yAxis: {
        axisLabel: 'MEMORY',
        axisLabelDistance: -10
      }
    }
  };

  constructor() { }

  ngOnInit() {    
    if (this.chartType == 'Request Rate Trend') {
      this.options = this.chartOptions;
      if (this.cData != undefined) {
        this.chartData = this.createLineChartData();
      }
    }
    else if (this.chartType == 'DB Availability Trend') {
      this.options = this.chartOptions;
      if (this.cData != undefined) {
        this.chartData = this.createAvailaibleChartData();
      }
    }
    else if (this.chartType == 'Memory Uses(Top 5)') {
      this.options = this.barChartOptions;
      if (this.cData != undefined) {
        this.chartData = this.cData;
      }
    }
  }
 getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


  createAvailaibleChartData() {
    let data = [];
    let i = 0;
    let c =0;
    let linedata = {};
    linedata['values'] = [];
    this.cData.forEach(element => {
      let tempdata = { x: 0, y: 0 };
      tempdata.x = i;
      if (element.data != undefined) {
        tempdata.y = element.data.UnavialableDB;
      }
      else {
        tempdata.y = 0;
      }
      linedata['values'].push(tempdata);
      i += 3;
    });
    linedata['color'] = '#7777ff';
    linedata['area'] = true;
    linedata['legend']=false;
    data.push(linedata);
    return data;
  }

  createLineChartData() {
    let data = [];
    this.cData.forEach(element => {
      let linedata = {};
      linedata['values'] = [];
      for (let i = 0; i < element.data.length; i++) {
        let tempdata = { x: 0, y: 0 };
        tempdata.x = (i == 0) ? i : i * 3;
        tempdata.y = element.data[i].data.length;
        linedata['values'].push(tempdata);
        linedata['color'] = this.getRandomColor();
      }
      linedata['key'] = element.name;
      data.push(linedata);
    });
    return data;

  }

}
