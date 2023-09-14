import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-depart',
    templateUrl: './depart.component.html',
    styleUrls: ['./depart.component.scss']
})
export class DepartComponent {

    public selected = new FormControl(0);
    public list = [
        {title: 'one'},
        {title: 'two'}
    ];

    close() {
        alert('click');
    }

    add() {
        const a = this.list;
        this.list = [{title: '1'}, {title: 'one'},
            {title: 'two'}];
        console.log(this.list === a);
        // this.list = [
        //     {title: '1'},
        //     {title: '2'},
        //     {title: '3'},
        // ];
    }

    selectedTabChange($event: any) {
        console.log($event.index)
    }
}
