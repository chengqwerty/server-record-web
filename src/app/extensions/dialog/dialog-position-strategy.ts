import { OverlayRef, PositionStrategy } from '@angular/cdk/overlay';

export class DialogPositionStrategy implements PositionStrategy {

    private _overlayRef: OverlayRef | null = null;

    apply(): void {
    }

    attach(overlayRef: OverlayRef): void {
        this._overlayRef = overlayRef;
    }

    dispose(): void {
    }

}
