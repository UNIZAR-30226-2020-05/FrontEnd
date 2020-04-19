import { TestBed } from '@angular/core/testing';

import { ServicioComponentesService } from './servicio-componentes.service';

describe('ServicioComponentesService', () => {
  let service: ServicioComponentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioComponentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
