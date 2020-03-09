import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSocialComponent } from './panel-social.component';

describe('PanelSocialComponent', () => {
  let component: PanelSocialComponent;
  let fixture: ComponentFixture<PanelSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
