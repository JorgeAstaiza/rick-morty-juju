import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './services/catalogue.service';
import { Character } from 'src/app/interfaces/characters';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  public characters: Character[] = [];
  public pageNumber = this.catalogueService.pagenumber;
  public Allcharacters: Character[] = [];

  filterName = new FormControl();
  filterSpecie = new FormControl('all');

  speciesList: any[] = [];

  constructor(
    private catalogueService: CatalogueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  public getCharacters(nextPage = true) {
    if (nextPage) {
      this.pageNumber += 1;
    } else {
      this.pageNumber -= 1;
    }
    this.cleanFilter();
    this.speciesList = [];
    this.catalogueService.getCharacters(this.pageNumber).subscribe((res) => {
      this.characters = res.results;
      this.Allcharacters = this.characters;
      this.setFilterSpecie();
    });
  }

  public characterDetails(item: Character) {
    this.router.navigate(['/details']);
    this.catalogueService.characterDetail.next(item);
  }

  public filterByName() {
    if (this.filterName.value === '') this.characters = this.Allcharacters;
    this.characters = this.characters.filter((item) => {
      return item.name
        ?.toLowerCase()
        .includes(this.filterName.value.toLowerCase());
    });
  }

  public filterBySpecie() {
    if (this.filterSpecie.value === 'all') {
      this.characters = this.Allcharacters;
    } else {
      this.characters = this.Allcharacters.filter(
        (item) =>
          item.species?.toLowerCase() ===
          this.filterSpecie?.value?.toLowerCase()
      );
    }
  }

  public cleanFilter() {
    this.characters = this.Allcharacters;
    this.filterName.reset();
    this.filterSpecie.setValue('all');
  }

  // agrega al filtro por specie solo las especies disponibles en el catalogo de personajes
  private setFilterSpecie() {
    this.characters?.forEach((item) => {
      this.speciesList?.push(item.species);
    });
    const dataArr = new Set(this.speciesList);
    this.speciesList = [...dataArr];
  }
}
