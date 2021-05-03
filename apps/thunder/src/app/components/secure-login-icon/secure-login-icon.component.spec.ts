import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureLoginIconComponent } from './secure-login-icon.component';

describe('SecureLoginIconComponent', () => {
  let component: SecureLoginIconComponent;
  let fixture: ComponentFixture<SecureLoginIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecureLoginIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureLoginIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
