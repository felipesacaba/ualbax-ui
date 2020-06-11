import {RouterModule, Routes} from '@angular/router';
import {CadastrarClienteComponent} from '../../cliente/cadastrar-cliente/cadastrar.cliente.component';
import {NgModule} from '@angular/core';
import {LancarEstoqueComponent} from './lancar.estoque.component';

const routes: Routes = [
  {
    path: '',
    component: LancarEstoqueComponent,
    data: {
      title: 'Entradas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancarEstoqueRoutingModule {

}
