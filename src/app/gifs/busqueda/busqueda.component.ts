import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar(/*termino: string*/) {
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim().toString() === '') return;
    this.gifsService.buscarGifs(value);
    this.txtBuscar.nativeElement.value = '';
  }

}
