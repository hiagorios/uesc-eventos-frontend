import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistranteListComponent } from './ministrante-list.component';

describe('MinistranteListComponent', () => {
  let component: MinistranteListComponent;
  let fixture: ComponentFixture<MinistranteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistranteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistranteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
