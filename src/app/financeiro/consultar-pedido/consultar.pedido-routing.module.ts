import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsultarPedidoComponent} from './consultar.pedido.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultarPedidoComponent,
    data: {
      title: 'Item - Buscar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultarPedidoRoutingModule {

}
