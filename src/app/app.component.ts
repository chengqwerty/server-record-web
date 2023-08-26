import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        matIconRegistry.addSvgIcon('set', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/set.svg'));
        matIconRegistry.addSvgIcon('up', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/up.svg'));
    }

}
