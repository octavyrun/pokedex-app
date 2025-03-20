import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from '../../services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'picture', 'details', 'catch'];
  dataSource = new MatTableDataSource<any>([]);
  allPokemon: any[] = [];
  caughtPokemon: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pokemonService: PokemonService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPokemon();

    if (isPlatformBrowser(this.platformId)) {
      this.caughtPokemon = JSON.parse(
        localStorage.getItem('caughtPokemon') || '[]'
      );
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPokemon() {
    this.pokemonService.getAllPokemon(151).subscribe((data) => {
      let pokemonArray = data.results.map((pokemon: any, index: number) => ({
        id: index + 1,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));

      this.dataSource.data = pokemonArray;

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._changePageSize(this.paginator.pageSize);
      });
    });
  }

  catchPokemon(pokemon: any) {
    if (!this.isBrowser()) return;

    if (!this.caughtPokemon.some((p) => p.id === pokemon.id)) {
      this.caughtPokemon.push(pokemon);
      localStorage.setItem('caughtPokemon', JSON.stringify(this.caughtPokemon));
    }
  }

  isCaught(pokemon: any): boolean {
    return (
      this.isBrowser() && this.caughtPokemon.some((p) => p.id === pokemon.id)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  openDialog(pokemon: any) {
    this.pokemonService.getPokemonDetails(pokemon.id).subscribe((details) => {
      this.dialog.open(PokemonDialogComponent, {
        width: '400px',
        data: {
          name: pokemon.name,
          image: pokemon.image,
          abilities: details.abilities,
        },
      });
    });
  }
}
