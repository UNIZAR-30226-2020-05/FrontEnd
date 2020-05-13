import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPodcastComponent } from './vista-podcast.component';

describe('VistaPodcastComponent', () => {
  let component: VistaPodcastComponent;
  let fixture: ComponentFixture<VistaPodcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPodcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
