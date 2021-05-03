import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuriedTreasureIconComponent } from './buried-treasure-icon.component';

describe('BuriedTreasureIconComponent', () => {
  let component: BuriedTreasureIconComponent;
  let fixture: ComponentFixture<BuriedTreasureIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuriedTreasureIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuriedTreasureIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
