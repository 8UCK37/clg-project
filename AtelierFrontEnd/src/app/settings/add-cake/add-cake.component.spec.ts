import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCakeComponent } from './add-cake.component';

describe('ChatSettingsComponent', () => {
  let component: AddCakeComponent;
  let fixture: ComponentFixture<AddCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
