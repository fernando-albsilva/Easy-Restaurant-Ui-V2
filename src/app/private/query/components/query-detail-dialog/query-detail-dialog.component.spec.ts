import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDetailDialogComponent } from './query-detail-dialog.component';

describe('QueryDetailDialogComponent', () => {
  let component: QueryDetailDialogComponent;
  let fixture: ComponentFixture<QueryDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
