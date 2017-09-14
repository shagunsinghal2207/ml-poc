import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateForestComponent } from './create-forest.component';

describe('CreateForestComponent', () => {
  let component: CreateForestComponent;
  let fixture: ComponentFixture<CreateForestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateForestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateForestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
