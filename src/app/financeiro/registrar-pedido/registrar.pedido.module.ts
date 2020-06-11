import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
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
  MatPaginatorModule, MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {RegistrarPedidoComponent} from './registrar.pedido.component';
import {RegistrarPedidoRoutingModule} from './registrar.pedido-routing.module';
import localePt from '@angular/common/locales/pt';
import {MAT_DATE_LOCALE} from '@angular/material';
import {CurrencyMaskModule} from 'ng2-currency-mask';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    RegistrarPedidoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrarPedidoRoutingModule,
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
export class RegistrarPedidoModule {

}
