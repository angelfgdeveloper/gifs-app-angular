import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gift } from '../interface/gift.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ePlFW7Den6PN1B80z60l4jbYu66DzBYw';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gift[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  get historial() {
    return [...this._historial]; // Romper relacion
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    const existeQuery = this._historial.some(item => item === query);

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params })
        .subscribe((resp) => {
          console.log(resp.data);
          this.resultados = resp.data;

          if (!existeQuery) {
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
          }

        });
  }

  // fetch('https://api.giphy.com/v1/gifs/search?api_key=ePlFW7Den6PN1B80z60l4jbYu66DzBYw&q=dbz&limit=10')
  // .then(resp => {
  //   resp.json().then(data => {
  //     console.log(data);
  //   });
  // });

}
