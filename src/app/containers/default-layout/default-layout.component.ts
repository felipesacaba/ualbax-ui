import {Component, OnDestroy, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {MenuService} from "./menu.service";
import {LoginService} from "../../views/login/login.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy,OnInit {
  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  constructor(
      private loginService: LoginService,
      private menuService: MenuService,
      @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit() {
    this.getMenu();
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout(): void {
    this.loginService.logout();
  }

  getMenu(){
    this.menuService.menuList().subscribe(
        res =>{
          this.navItems = res;
        }
    )
  }
}
