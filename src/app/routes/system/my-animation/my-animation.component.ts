import { Component }                                  from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-my-animation',
    standalone: false,
    templateUrl: './my-animation.component.html',
    styleUrl: './my-animation.component.scss',
    animations:[
        trigger('openClose', [
            state('open', style({
                backgroundColor: 'red',
            })),
            state('closed', style({
                backgroundColor: 'blue',
            })),
            transition('open => closed', [animate('1s')]),
        ])
    ]
})
export class MyAnimationComponent {

    state= 'open';

    toggle(){
        this.state = this.state === 'open' ? 'closed' : 'open';
    }

    getState(){
        return this.state;
    }
}
