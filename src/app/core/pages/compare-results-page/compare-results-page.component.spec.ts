import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareResultsPageComponent } from './compare-results-page.component';

describe('CompareResultsPageComponent', () => {
  let component: CompareResultsPageComponent;
  let fixture: ComponentFixture<CompareResultsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareResultsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
