import { Component }                      from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer }                   from '@angular/platform-browser';
import { RouterOutlet }                   from '@angular/router';
import { MatFormFieldModule }             from '@angular/material/form-field';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatIconModule, MatFormFieldModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    }

}
