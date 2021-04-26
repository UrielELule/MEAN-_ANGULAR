import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
  
  public labels1: Array<string>[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], ['dsd', 'bbg']];

  public data1 = [333, 333, 333];
  public data2 = [533, 864, 23];
  public data3 = [25, 89, 312];
  public data4 = [985, 245, 677];

  constructor() { }

  ngOnInit(): void {  
  }

  
}
