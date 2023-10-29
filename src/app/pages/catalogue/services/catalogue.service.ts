import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponseCharacter } from 'src/app/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private readonly APIURL = environment.baseUrl;
  public pagenumber = 0;

  characterDetail = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<ApiResponseCharacter> {
    return this.http.get<ApiResponseCharacter>(`${this.APIURL}?page=${page}`);
  }
}
