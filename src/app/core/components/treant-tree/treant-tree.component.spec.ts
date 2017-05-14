import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreantTreeComponent } from './treant-tree.component';

describe('TreantTreeComponent', () => {
  let component: TreantTreeComponent;
  let fixture: ComponentFixture<TreantTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreantTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreantTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
