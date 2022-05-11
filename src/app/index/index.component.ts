
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;
  indexAnterior:number=0;
  stringEnvio: string="";
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.stringEnvio=filterValue;
    let palabras = filterValue.split(" ")
    let index= palabras.length
    let PalabraActual=palabras[index-1]
    
    if (index > this.indexAnterior){
      let Palabrafinal=palabras[index-2]
      let PalabraAnterior=palabras[index-3]
      if (!PalabraAnterior){
        PalabraAnterior="";
        console.log(PalabraAnterior)
      }
      console.log(PalabraAnterior,Palabrafinal)
      
      this.indexAnterior = index;
      return this.options.filter(option => option.toLowerCase());
    }else{
      return this.options.filter(option => option.toLowerCase().includes(PalabraActual));
    }
   
    
  }

  enviar(){
      window.open("https://www.google.com/search?q="+this.stringEnvio, "_blank");
      
  }
}
