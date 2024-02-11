import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNotificationComponent } from './player-notification.component';

describe('PlayerNotificationComponent', () => {
  let component: PlayerNotificationComponent;
  let fixture: ComponentFixture<PlayerNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerNotificationComponent]
    });
    fixture = TestBed.createComponent(PlayerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
