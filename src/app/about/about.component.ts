import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
  private readonly window: Window = this.document.defaultView as Window;
  @ViewChild('introContainer', { static: true }) private introContainer!: ElementRef<HTMLElement>;
  @ViewChild('introArrow', { static: true }) private introArrow!: ElementRef<HTMLElement>;
  @ViewChild('skillsIconsContainer', { static: true }) private skillsIconsContainer!: ElementRef<HTMLElement>;

  private arrowTimer?: ReturnType<typeof setTimeout>;
  private skillAnimationTriggered = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    //Only show the arrow animation if the intro area is smaller than it's max height
    //This means the screen is small enough to not show the next section top, so we want
    //to only show an arrow if it might not be obvious that there is more content
    const maxHeight = parseInt(getComputedStyle(this.introContainer.nativeElement).getPropertyValue('max-height'), 10);
    const actualHeight = this.introContainer.nativeElement.getBoundingClientRect().height;

    if (actualHeight <= maxHeight) {
      this.arrowTimer = setTimeout(() => {
        this.introArrow.nativeElement.classList.add('shown');
      }, 5000);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.arrowTimer) {
      clearTimeout(this.arrowTimer);
      this.arrowTimer = undefined;
      this.introArrow.nativeElement.classList.remove('shown');
    }

    if (!this.skillAnimationTriggered) {
      const iconsTop = this.skillsIconsContainer.nativeElement.getBoundingClientRect().top;
      if (this.window.innerHeight >= iconsTop + 100) {
        this.skillAnimationTriggered = true;
        this.skillsIconsContainer.nativeElement.classList.add('animated');
      }
    }
  }
}
