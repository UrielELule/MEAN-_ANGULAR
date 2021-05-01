import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string;
  public titulosubs$: Subscription;

  constructor(private router: Router) { 

   this.titulosubs$ = this.getDataRuta().subscribe( ({titulo}) => {
    this.titulo = titulo;
    document.title = `Angular Avanzado - ${titulo}`;
  });
  
  }
  ngOnDestroy(): void {
    this.titulosubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getDataRuta(){
     //con events estan todos los operadores de rxjs
     return this.router.events
     .pipe(
       filter( event => event instanceof ActivationEnd),
       filter( (event: ActivationEnd) =>  event.snapshot.firstChild === null),
       map( (event: ActivationEnd) => event.snapshot.data),
     );
     
  }


}
