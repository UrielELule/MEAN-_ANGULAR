import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy{

  public intervalsub: Subscription;

  constructor() {
    
    /*
    this.retornaObservable().pipe( //FORMA DE TRANSFORMAR E RECONSTRUIR LA INFORMACION
      retry(1)
    ).subscribe(
      valor => console.log('Subs:', valor), 
      (error) => console.log('Upps un error', error),
      () => console.info('Completado')  
    );
    */

    this.intervalsub = this.retornaIntervalo()
      .subscribe(console.log); 

     

  }
  ngOnDestroy(): void {
    this.intervalsub.unsubscribe();
  }

  ngOnInit(): void {
  }

  //segunda forma de intervalos 
  retornaIntervalo(): Observable<number> {

    return interval(500)
      .pipe(
      map( valor => valor + 1),
      filter(valor => (valor % 2 === 0) ? true: false ),
    );
    
  }


  //intervalo manual 
  retornaObservable(): Observable<number>{
    let i = -1;
    /**OBSERBVABLE CON COMPLETE Y ERROR**/
    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i); 

        if( i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2) {
          //i = 0;
          observer.error('i LLEGO AL VALOR DE 2');
        }

      }, 1000)
    });
    return obs$;
  }

}
