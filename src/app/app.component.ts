import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PokemonService } from './core/services/pokemon/pokemon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  searchForm: FormGroup;

  constructor(
    private pokemonService: PokemonService,
    private form: FormBuilder
  ) {
    this.searchForm = this.createSearchForm();
    this.subscribeSearchForm();
  }

  ngOnInit() {
    this.searchForm.get('search')?.setValue('pikachu');
  }

  subscribeSearchForm() {
    this.searchForm.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(({ search }) => {
        this.getPokemon(search);
      });
  }

  getPokemon(name: string) {
    this.pokemonService.getPokemonByname(name).subscribe({
      next: (pokemon) => {
        if (pokemon) {
          console.log(pokemon, 'pokemon');
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createSearchForm() {
    return this.form.group({
      search: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
