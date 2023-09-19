import { Component, OnInit } from '@angular/core';
import { icons }             from '@/app/extensions/icon/icon';

@Component({
  selector: 'icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

    protected readonly icons = icons;

    ngOnInit(): void {
        console.log(icons);
    }


}
