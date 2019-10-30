import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit2PageComponent } from './edit2-page.component';

describe('Edit2PageComponent', () => {
  let component: Edit2PageComponent;
  let fixture: ComponentFixture<Edit2PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit2PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
