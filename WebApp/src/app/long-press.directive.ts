import { Directive, ElementRef, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective implements OnDestroy {
  @Output() longPress = new EventEmitter();

  private readonly DESTROY$ = new Subject<void>();
  private readonly PRESS_DURATION = 500; // Adjust as needed

  constructor(private elementRef: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: MouseEvent | TouchEvent) {
    const mouseUp$ = fromEvent(document, 'mouseup');
    const touchEnd$ = fromEvent(document, 'touchend');

    const timer$ = new Observable<void>(observer => {
      const timer = setTimeout(() => {
        observer.next();
        observer.complete();
      }, this.PRESS_DURATION);

      return () => clearTimeout(timer);
    });

    timer$.pipe(
      takeUntil(mouseUp$),
      takeUntil(touchEnd$),
      takeUntil(this.DESTROY$)
    ).subscribe(() => {
      this.longPress.emit();
    });
  }

  ngOnDestroy() {
    this.DESTROY$.next();
    this.DESTROY$.complete();
  }
}
