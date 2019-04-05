import { PlataformDetectorService } from './../../../core/plataform-detector.service';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector:'[immediateClick]'
})
export class ImmediateClickDirective implements OnInit{

    constructor(
        private element: ElementRef<any>,
        private plataformDetectorService:PlataformDetectorService
        ){
        }

        ngOnInit(): void {
        this.plataformDetectorService.isPlatformBrowser() &&
            this.element.nativeElement.click();
    }
}