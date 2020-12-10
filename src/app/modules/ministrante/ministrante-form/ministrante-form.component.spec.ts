import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistranteFormComponent } from './ministrante-form.component';

describe('MinistranteFormComponent', () => {
  let component: MinistranteFormComponent;
  let fixture: ComponentFixture<MinistranteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistranteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistranteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
