import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  urlImg = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

  listaPokemon = [];
  count: number = 0;
  next: string = "";
  previous: string = "";

  paginaAtual: number = 1;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.buscarPokemon(this.apiService.urlApi);
  }


  buscarPokemon(url: string) {
    this.listaPokemon = [];
    this.apiService.buscarListaPokemon(url).subscribe(retorno => {
      console.log(retorno)
      this.count = retorno['count'];
      this.next = retorno['next'];
      this.previous = retorno['previous'];

      retorno['results'].forEach(pokemon => {
        this.apiService.buscarDadosPokemon(pokemon['url']).subscribe(dadosPokemon => { 
          this.listaPokemon.push(dadosPokemon);
          this.listaPokemon.sort((a,b) => a['id']-b['id']);
        });
        
      });
    });
  }

  totalPaginas(numero: number) {
    return Math.ceil(numero / 20);
  }

  proximaPagina(url: string) {
    this.paginaAtual = this.paginaAtual + 1;
    this.buscarPokemon(url);
  }

  paginaAnterior(url: string) {
    this.paginaAtual = this.paginaAtual - 1;
    this.buscarPokemon(url);
  }
}