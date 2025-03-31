import { Component, OnInit } from '@angular/core';
import { MatIconModule }     from '@angular/material/icon';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { ExtensionsModule }  from '@/app/extensions/extensions.module';

@Component({
    selector: 'app-art-header',
    standalone: true,
    imports: [
        MatIconModule,
        MatToolbarModule,
        ExtensionsModule,
    ],
    templateUrl: './art-header.component.html',
    styleUrls: ['./art-header.component.scss']
})
export class ArtHeaderComponent implements OnInit {

    public iconName = 'deck';

    ngOnInit(): void {
        setTimeout(() => {
            this.iconName = 'cake';
        }, 1200);
    }

}
