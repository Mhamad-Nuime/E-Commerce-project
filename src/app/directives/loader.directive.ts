import { Directive, OnChanges, TemplateRef, ViewContainerRef, inject, SimpleChanges, Input, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Directive({
  selector: '[hidden]',
  standalone: true
})
export class LoaderDirective implements OnChanges {

  @Input()
  hidden : boolean | null = false;

  viewContainerRef = inject(ViewContainerRef);
  templete = inject(TemplateRef);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["hidden"].currentValue){
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templete);
    }
  }
}
