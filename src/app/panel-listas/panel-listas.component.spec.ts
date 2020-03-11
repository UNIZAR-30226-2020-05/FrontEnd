import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListasComponent } from './panel-listas.component';

describe('PanelListasComponent', () => {
  let component: PanelListasComponent;
  let fixture: ComponentFixture<PanelListasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelListasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
