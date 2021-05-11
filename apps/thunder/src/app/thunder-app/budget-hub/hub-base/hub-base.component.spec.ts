import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubBaseComponent } from './hub-base.component';

describe('HubBaseComponent', () => {
  let component: HubBaseComponent;
  let fixture: ComponentFixture<HubBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
