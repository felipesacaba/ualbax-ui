import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AppComponent} from './app.component';
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule,} from '@coreui/angular';
import {AppRoutingModule} from './app.routing';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts';
import localePt from '@angular/common/locales/pt';
import {RegistrarPedidoModule} from './financeiro/registrar-pedido/registrar.pedido.module';
import {CadastrarClienteModule} from './cliente/cadastrar-cliente/cadastrar.cliente.module';
import {LancarEstoqueModule} from './estoque/lancar-estoque/lancar.estoque.module';
import {ConsultarPedidoModule} from './financeiro/consultar-pedido/consultar.pedido.module';
import {MatExpansionModule} from '@angular/material';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    CadastrarClienteModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    RegistrarPedidoModule,
    ConsultarPedidoModule,
    CadastrarClienteModule,
    LancarEstoqueModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
