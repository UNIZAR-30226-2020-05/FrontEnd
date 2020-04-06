import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAlbumComponent } from './vista-album.component';

describe('VistaAlbumComponent', () => {
  let component: VistaAlbumComponent;
  let fixture: ComponentFixture<VistaAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
