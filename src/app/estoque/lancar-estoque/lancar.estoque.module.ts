import {CommonModule, registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {LancarEstoqueComponent} from './lancar.estoque.component';
import {LancarEstoqueRoutingModule} from './lancar.estoque-routing.module';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    LancarEstoqueComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LancarEstoqueRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSortModule,
    MatAutocompleteModule,
    MatRadioModule,
    CurrencyMaskModule
  ],
  exports: [HttpClientModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
})
export class LancarEstoqueModule {

}
