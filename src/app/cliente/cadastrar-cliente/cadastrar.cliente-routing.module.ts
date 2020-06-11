import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CadastrarClienteComponent} from './cadastrar.cliente.component';

const routes: Routes = [
  {
    path: '',
    component: CadastrarClienteComponent,
    data: {
      title: 'Cadastrar - Cliente'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CadastrarClienteRoutingModule {

}
