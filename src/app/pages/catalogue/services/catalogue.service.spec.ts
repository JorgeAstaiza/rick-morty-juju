import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CatalogueService } from './catalogue.service';
import { catalogueMock } from './catalogue.mock';

describe('CatalogueService', () => {
  let service: CatalogueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CatalogueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should get rick and morty data page 1', (done) => {
    const page = 1;
    service.getCharacters(page).subscribe((pokemon) => {
      expect(pokemon).toEqual(catalogueMock);
      done();
    });

    const req = httpMock.expectOne(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    req.flush(catalogueMock);
  });
});
