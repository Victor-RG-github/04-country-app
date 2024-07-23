import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Input()
  placeholder: string = '';

  @Output()
  onValue = new EventEmitter<string>();

  emitValue(value: string) {
    if (!value || value.length === 0) return;
    this.onValue.emit(value);
  }
}
