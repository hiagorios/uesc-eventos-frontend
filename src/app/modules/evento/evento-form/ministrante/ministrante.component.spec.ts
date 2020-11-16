import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistranteComponent } from './ministrante.component';

describe('MinistranteComponent', () => {
  let component: MinistranteComponent;
  let fixture: ComponentFixture<MinistranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
