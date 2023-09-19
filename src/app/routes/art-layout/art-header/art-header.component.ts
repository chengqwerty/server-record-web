import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-art-header',
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
