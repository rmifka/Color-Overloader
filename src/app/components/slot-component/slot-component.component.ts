import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color, ColorScheme } from '../../model/color-schemes-settings.model';

@Component({
  selector: 'app-slot-component',
  standalone: true,
  imports: [],
  templateUrl: './slot-component.component.html',
  styleUrl: './slot-component.component.scss'
})
export class SlotComponentComponent implements OnInit {
  @Input() colorScheme: ColorScheme | null = null;
  @Output() clickEvent = new EventEmitter<void>();

  emitClickEvent(): void {
    this.clickEvent.emit();
  }

  ngOnInit(): void {
    if(this.colorScheme === null){
      
    }
  }

  formatColor(color: Color | undefined): string {
    if(!color)
    {
      return "";
    }
    return `rgba(${color.r * 255}, ${color.g* 255}, ${color.b* 255}, ${color.a* 255})`;
  }
}
