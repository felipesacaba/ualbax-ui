import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  MatPaginatorIntl,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import localePt from '@angular/common/locales/pt';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {ConsultarPedidoRoutingModule} from './consultar.pedido-routing.module';
import {ConsultarPedidoComponent} from './consultar.pedido.component';
import {PedidoModalComponent} from './pedido.modal/pedido.modal.component';
import {MatPaginatorIntlCro} from './matPaginatorIntlCro';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    ConsultarPedidoComponent,
    PedidoModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConsultarPedidoRoutingModule,
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
    CurrencyMaskModule,
    MatSnackBarModule
  ],
  exports: [HttpClientModule],
  entryComponents: [
    PedidoModalComponent
  ],
  providers: [
    DatePipe, {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
  ],
})

export class ConsultarPedidoModule {

}
