import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeChangerComponent } from './volume-changer.component';

describe('VolumeChangerComponent', () => {
  let component: VolumeChangerComponent;
  let fixture: ComponentFixture<VolumeChangerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeChangerComponent]
    });
    fixture = TestBed.createComponent(VolumeChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
