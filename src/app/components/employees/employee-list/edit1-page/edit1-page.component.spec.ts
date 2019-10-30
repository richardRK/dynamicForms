import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit1PageComponent } from './edit1-page.component';

describe('Edit1PageComponent', () => {
  let component: Edit1PageComponent;
  let fixture: ComponentFixture<Edit1PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit1PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit1PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
