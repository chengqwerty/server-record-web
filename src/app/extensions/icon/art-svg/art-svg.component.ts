import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry }                                    from '@angular/material/icon';
import { DomSanitizer }             from '@angular/platform-browser';
import { icons }                    from '@/app/extensions/icon/icon';

// @ts-ignore
@Component({
    selector: 'art-svg',
    templateUrl: './art-svg.component.html',
    styleUrls: ['./art-svg.component.scss']
})
export class ArtSvgComponent implements OnInit, OnChanges {

    @Input()
    public svgName: string = 'assignment_ind';

    @Input()
    public directory: string = 'action';

    @Input()
    public type: string = 'materialicons';

    @Input()
    public width: string = '24px';

    @Input()
    public height: string = '24px';

    public styleExpression = {width: this.width, height: this.height};
    public fullName: string = '';
    public show: boolean = false;

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

    }

    ngOnInit(): void {
        this.registrySvg();
        this.styleExpression = {width: this.width, height: this.height};
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if ((changes['svgName'] && !changes['svgName']['firstChange']) || (changes['directory'] && !changes['directory']['firstChange']) || (changes['type'] && !changes['type']['firstChange'])) {
            this.registrySvg();
        }
        if ((changes['width'] && !changes['width']['firstChange']) || (changes['height'] && !changes['height']['firstChange'])) {
            this.styleExpression = {width: this.width, height: this.height};
        }
    }

    registrySvg() {
        const icon = icons[this.directory][this.svgName][this.type];
        if (icon) {
            this.fullName = this.svgName + '_' + this.type;
            if (!icon.registry) {
                this.matIconRegistry.addSvgIcon(this.svgName + '_' + this.type, this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path));
                icon.registry = true;
            }
            this.show = true;
        }
    }

}
