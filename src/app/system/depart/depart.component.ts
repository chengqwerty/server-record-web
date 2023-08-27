import { Component } from '@angular/core';

@Component({
    selector: 'app-depart',
    templateUrl: './depart.component.html',
    styleUrls: ['./depart.component.scss']
})
export class DepartComponent {

    close() {
        alert('click');
    }
}
