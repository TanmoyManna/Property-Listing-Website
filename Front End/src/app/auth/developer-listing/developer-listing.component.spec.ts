import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperListingComponent } from './developer-listing.component';

describe('DeveloperListingComponent', () => {
  let component: DeveloperListingComponent;
  let fixture: ComponentFixture<DeveloperListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
