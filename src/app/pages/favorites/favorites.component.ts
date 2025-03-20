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
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'picture', 'release'];
  dataSource = new MatTableDataSource<any>([]);
  favoritePokemon$ = new BehaviorSubject<any[]>([]);
  isBrowser: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.favoritePokemon$.subscribe((favorites) => {
        this.dataSource.data = favorites;
      });
      this.loadFavorites();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadFavorites() {
    if (!this.isBrowser) return;
    const favorites = JSON.parse(localStorage.getItem('caughtPokemon') || '[]');
    this.favoritePokemon$.next(favorites);
  }

  releasePokemon(index: number) {
    if (!this.isBrowser) return;

    const globalIndex =
      this.paginator.pageIndex * this.paginator.pageSize + index;
    let favorites = [...this.favoritePokemon$.value];

    if (globalIndex >= 0 && globalIndex < favorites.length) {
      favorites.splice(globalIndex, 1);
      localStorage.setItem('caughtPokemon', JSON.stringify(favorites));

      this.favoritePokemon$.next(favorites);
    }
  }
}
