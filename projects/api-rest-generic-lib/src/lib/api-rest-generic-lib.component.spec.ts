import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRestGenericLibComponent } from './api-rest-generic-lib.component';

describe('ApiRestGenericLibComponent', () => {
  let component: ApiRestGenericLibComponent;
  let fixture: ComponentFixture<ApiRestGenericLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRestGenericLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRestGenericLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
