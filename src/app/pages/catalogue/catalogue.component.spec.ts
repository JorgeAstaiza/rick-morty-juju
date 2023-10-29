import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueComponent } from './catalogue.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CatalogueService } from './services/catalogue.service';
import { catalogueMock } from './services/catalogue.mock';
import { ReactiveFormsModule } from '@angular/forms';

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;
  let httpMock: HttpTestingController;
  let compiled: HTMLElement;
  let service: CatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogueComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [CatalogueService],
    });
    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CatalogueService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should do a request HTTP GET and call setFilterSpecie and cleanFilter', () => {
    const specieListMock = ['Human', 'Alien'];
    const spySetFilterSpecie = jest.spyOn(component as any, 'setFilterSpecie');
    const spycleanFilter = jest.spyOn(component, 'cleanFilter');

    component.getCharacters(true);

    const request = httpMock.expectOne(
      'https://rickandmortyapi.com/api/character?page=1'
    );

    expect(request.request.method).toBe('GET');
    request.flush(catalogueMock);
    fixture.detectChanges();
    expect(component.characters).toEqual(catalogueMock.results);
    expect(component.speciesList).toEqual(specieListMock);

    expect(spySetFilterSpecie).toHaveBeenCalled();
    expect(spycleanFilter).toHaveBeenCalled();
  });

  test('should filter the character by name', () => {
    const initialCharacters = [
      { name: 'Rick' },
      { name: 'Morty' },
      { name: 'Summer' },
    ];

    component.Allcharacters = initialCharacters;
    component.characters = initialCharacters;
    component.filterName.setValue('rick');

    component.filterByName();

    expect(component.characters).toEqual([{ name: 'Rick' }]);
  });

  test('should show all characters if filterName is empty', () => {
    const initialCharacters = [
      { name: 'Rick' },
      { name: 'Morty' },
      { name: 'Summer' },
    ];

    component.Allcharacters = initialCharacters;
    component.characters = initialCharacters;
    component.filterName.setValue('');

    component.filterByName();

    expect(component.characters).toEqual(initialCharacters);
  });

  test('should filter the characters by specie', () => {
    const initialCharacters = [
      { species: 'Human' },
      { species: 'Alien' },
      { species: 'Human' },
    ];

    component.Allcharacters = initialCharacters;
    component.characters = initialCharacters;
    component.filterSpecie.setValue('human');

    component.filterBySpecie();

    expect(component.characters).toEqual([
      { species: 'Human' },
      { species: 'Human' },
    ]);
  });

  test('should show all characters when filterSpecie is "all"', () => {
    const initialCharacters = [
      { species: 'Human' },
      { species: 'Alien' },
      { species: 'Human' },
    ];

    component.Allcharacters = initialCharacters;
    component.characters = initialCharacters;
    component.filterSpecie.setValue('all');

    component.filterBySpecie();

    expect(component.characters).toEqual(initialCharacters);
  });
});
