import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrarPedidoComponent} from './registrar.pedido.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrarPedidoComponent,
    data: {
      title: 'Pedido - Registrar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegistrarPedidoRoutingModule {

}
