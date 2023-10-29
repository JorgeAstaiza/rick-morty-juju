import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CatalogueComponent],
  imports: [CommonModule, CatalogueRoutingModule, ReactiveFormsModule],
})
export class CatalogueModule {}
