import { Component } from '@angular/core';
import { AppSettings, defaults } from "@/app/core/setting";

@Component({
  selector: 'app-art-layout',
  templateUrl: './art-layout.component.html',
  styleUrls: ['./art-layout.component.scss']
})
export class ArtLayoutComponent {

    public option: AppSettings;

    constructor() {
        this.option = defaults;
    }

}
