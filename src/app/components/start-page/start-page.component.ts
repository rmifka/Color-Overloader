import { Component } from '@angular/core';
import { Color, ColorScheme, ColorSchemesSettings } from '../../model/color-schemes-settings.model';
import { SlotComponentComponent } from '../slot-component/slot-component.component';
import { ColorEditorComponent } from '../color-editor/color-editor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [SlotComponentComponent, ColorEditorComponent,CommonModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  fileName: string = '';
  colorSchemesSettings: ColorSchemesSettings | null = null;

  entireData: any;

  public selectedSlot: ColorScheme | null = null;

  updateFileName(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.readFileContent(file);
    }
  }

  updateSelectedSlot(index: number) {
    if (this.colorSchemesSettings === null) {
      return;
    }

    this.selectedSlot = this.colorSchemesSettings.colorSchemes[index];
  }

  readFileContent(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      this.parseJsonContent(content);
    };
    reader.readAsText(file);
  }

  parseJsonContent(content: string): void {
    try {
      const data = JSON.parse(content);
      this.entireData = data;
      console.log(data.localPlayers[0].colorSchemesSettings);
      if (data.localPlayers[0].colorSchemesSettings) {
        this.colorSchemesSettings = data.localPlayers[0].colorSchemesSettings as ColorSchemesSettings;
        this.selectedSlot = this.colorSchemesSettings.colorSchemes[0];
      } else {
        console.error('Invalid data format');
      }
    } catch (error) {
      console.error('Error parsing JSON', error);
    }
  }

  exportClicked() {
    this.entireData.localPlayers[0].colorSchemesSettings = this.colorSchemesSettings;
    console.log(this.entireData);
    const stringified = JSON.stringify(this.entireData);

    const blob = new Blob([stringified], {
      type: 'application/octet-stream'
    });
    const a = document.createElement('a');

    // Create a URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // Assign the URL to the <a> element's href attribute
    a.href = url;

    // Set the filename for the downloaded file
    a.download = 'PlayerData.dat';

    // Append the <a> element to the DOM
    document.body.appendChild(a);

    // Programmatically click the <a> element to trigger the download
    a.click();

    // Clean up: remove the <a> element and revoke the URL object to release memory
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  //Code Duplication type shi
  rgbToHex(color: Color): string {
    const toHex = (c: number) => {
      const hex = Math.round(Math.min(Math.max(c * 255, 0), 255)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };


    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }
}
