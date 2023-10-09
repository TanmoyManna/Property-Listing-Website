import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSubmitsComponent } from './contact-submits.component';

describe('ContactSubmitsComponent', () => {
  let component: ContactSubmitsComponent;
  let fixture: ComponentFixture<ContactSubmitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactSubmitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSubmitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
