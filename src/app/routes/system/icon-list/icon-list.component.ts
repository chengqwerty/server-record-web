import { Component, OnInit } from '@angular/core';
import { iconDirectory }     from '@/app/extensions/icon/icon';
import { ArtDialogService }  from '@think-make/art-extends/art-dialog';

@Component({
    selector: 'icon-list',
    standalone: false,
    templateUrl: './icon-list.component.html',
    styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent {

    protected readonly iconDirectory = iconDirectory;

    constructor(private artDialogService: ArtDialogService) {
    }

    copy(name: string, directory?: string) {
        let matIcon = '';
        if (directory) {
            matIcon = `<art-svg [svgName]="${name}"></art-svg>`;
        } else {
            matIcon = `<mat-icon fontIcon="${name}"></mat-icon>`;
        }
        const type = 'text/plain';
        const blob = new Blob([matIcon], {type});
        const data = [new ClipboardItem({[type]: blob})];
        navigator.clipboard.write(data).then(() => {
            this.artDialogService.success('成功复制到剪切板！');
        });
    }

}
