import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckManagementSettingsDialogComponent } from './check-management-settings-dialog.component';

describe('CheckManagementSettingsDialogComponent', () => {
  let component: CheckManagementSettingsDialogComponent;
  let fixture: ComponentFixture<CheckManagementSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckManagementSettingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckManagementSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
