import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-pastel',
  templateUrl: './pastel.component.html',
  styleUrls: ['./pastel.component.css']
})
export class PastelComponent implements OnInit {

@Input() title: string = 'No title for the chart';

public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  } 
 };

@Input('labels') pieChartLabels: Label[] = [['jorge', 'javier'], ['chiri', 'rafa', 'Sales'], 'gema fernanda'];
@Input('data') pieChartData: number[] = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,215,0)', 'rgba(0,255,127)', 'rgba(255,105,180)'],
  },
];

constructor() { }

ngOnInit(): void {
}

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

changeLabels(): void {
  const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
    'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
    'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
    'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
    'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
  const randomWord = () => words[Math.trunc(Math.random() * words.length)];
  this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
}

addSlice(): void {
  this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);

  this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
}

removeSlice(): void {
  this.pieChartLabels.pop();

  this.pieChartColors[0].backgroundColor.pop();
}

changeLegendPosition(): void {
  this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
}


}
