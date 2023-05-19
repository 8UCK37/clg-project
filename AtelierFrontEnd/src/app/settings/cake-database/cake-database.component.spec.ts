import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeDatabaseComponent } from './cake-database.component';

describe('CakeDatabaseComponent', () => {
  let component: CakeDatabaseComponent;
  let fixture: ComponentFixture<CakeDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CakeDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CakeDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
