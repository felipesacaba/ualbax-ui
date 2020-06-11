import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pedido.ModalComponent } from './pedido.modal.component';

describe('Pedido.ModalComponent', () => {
  let component: Pedido.ModalComponent;
  let fixture: ComponentFixture<Pedido.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pedido.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pedido.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
