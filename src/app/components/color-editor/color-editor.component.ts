import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import { Color, ColorScheme, multiplyColor } from '../../model/color-schemes-settings.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-editor.component.html',
  styleUrl: './color-editor.component.scss'
})
export class ColorEditorComponent implements OnChanges {

  @Input() colorScheme: ColorScheme;
  slotToEdit: string = '';
  selectedSlot: Color = { r: 255, g: 0, b: 0, a: 1 };

  constructor() {
    // Initialize with a default color scheme
    this.colorScheme = {
      colorSchemeId: '',
      saberAColor: { r: 255, g: 0, b: 0, a: 1 },
      saberBColor: { r: 0, g: 255, b: 0, a: 1 },
      environmentColor0: { r: 0, g: 0, b: 255, a: 1 },
      environmentColor1: { r: 255, g: 255, b: 0, a: 1 },
      obstaclesColor: { r: 255, g: 0, b: 255, a: 1 },
      environmentColor0Boost: { r: 0, g: 255, b: 255, a: 1 },
      environmentColor1Boost: { r: 128, g: 128, b: 128, a: 1 }
    };
  }

  maxSliderLimits = 255;
  @Output() exportClicked : EventEmitter<void> = new EventEmitter<void>();


  increaseSliderLimits() {
    this.maxSliderLimits += 255;
  }

  resetSliderLimits() {
    this.maxSliderLimits = 255;
  }


  onColorSliderChange(event: Event, type: string): void {
    if (this.selectedSlot) {
      const input = event.target as HTMLInputElement;
      const value = Number(input.value);

      // Determine which color component to update based on the type parameter
      switch (type) {
        case 'red':
          this.selectedSlot.r = value / 255;
          break;
        case 'green':
          this.selectedSlot.g = value / 255;
          break;
        case 'blue':
          this.selectedSlot.b = value / 255;
          break;
        case 'alpha':
          this.selectedSlot.a = value / 255;
          break;
        default:
          console.error('Invalid color type');
      }

      // Update the slotToEdit with the new color value in hexadecimal format
      this.slotToEdit = this.rgbToHex(this.selectedSlot);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colorScheme']) {
      // The colorScheme input has changed.
      // You can add your logic here to respond to the change.
      console.log('colorScheme has changed:', changes['colorScheme'].currentValue);

      this.selectedSlot = changes['colorScheme'].currentValue.saberAColor;
      this.clickedColorEditSlot(this.selectedSlot);
    }
  }

  ngOnInit(): void {
    this.clickedColorEditSlot(this.colorScheme.saberAColor);

  }

  clickedColorEditSlot(slot: Color | null): void {
    if (!slot) {
      return;
    }

    const biggest = Math.max(slot.r * 255,slot.g * 255,slot.b * 255,slot.a * 255);
    this.maxSliderLimits = Math.max(Math.ceil(biggest / 255),1) * 255;
    console.log(this.maxSliderLimits);
    this.selectedSlot = slot;
    this.slotToEdit = this.rgbToHex(slot);
  }

  formatColor(color: Color | undefined): string {
    if (!color) {
      return '#000000';
    }
    return `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${color.a * 255})`;
  }

  onColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const color = input.value;

    if (this.selectedSlot) {
      this.slotToEdit = this.rgbToHex(this.selectedSlot);
      const rgb = this.hexToRgb(color);
      console.log(rgb);
      if (rgb) {
        this.selectedSlot.r = rgb.r;
        this.selectedSlot.g = rgb.g;
        this.selectedSlot.b = rgb.b;
      }
    }
  }

  hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  }

  rgbToHex(color: Color): string {
    const toHex = (c: number) => {
      const hex = Math.round(Math.min(Math.max(c * 255, 0), 255)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };


    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }

  outputExport(){
    this.exportClicked.emit()
  }

}
