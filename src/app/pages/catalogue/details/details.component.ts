import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../services/catalogue.service';
import { Character } from 'src/app/interfaces/characters';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  details?: Character;
  constructor(private catalogueService: CatalogueService) {}

  ngOnInit(): void {
    this.getDatails();
  }

  private getDatails() {
    this.catalogueService.characterDetail.subscribe((res) => {
      if (res.id) {
        this.details = res;
      }
    });
  }
}
