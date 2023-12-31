import { NgModule }              from '@angular/core';
import { MatFormFieldModule }    from '@angular/material/form-field';
import { MatInputModule }        from '@angular/material/input';
import { MatGridListModule }     from '@angular/material/grid-list';
import { MatTableModule }        from '@angular/material/table';
import { MatCardModule }         from '@angular/material/card';
import { MatButtonModule }       from '@angular/material/button';
import { MatDialogModule }       from '@angular/material/dialog';
import { MatSnackBarModule }     from '@angular/material/snack-bar';
import { MatTreeModule }         from '@angular/material/tree';
import { MatIconModule }         from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CdkTableModule }        from '@angular/cdk/table';
import { A11yModule }            from '@angular/cdk/a11y';
import { BidiModule }            from '@angular/cdk/bidi';
import { ObserversModule }       from '@angular/cdk/observers';
import { OverlayModule }         from '@angular/cdk/overlay';
import { PortalModule }          from '@angular/cdk/portal';
import { PlatformModule }        from '@angular/cdk/platform';
import { CdkStepperModule }      from '@angular/cdk/stepper';
import { ScrollingModule }       from '@angular/cdk/scrolling';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule }      from '@angular/material/divider';
import { MatTooltipModule }      from '@angular/material/tooltip';
import { MatSelectModule }       from '@angular/material/select';
import { MatExpansionModule }    from '@angular/material/expansion';


@NgModule({
    exports: [
        // CDK
        // A11yModule,
        // BidiModule,
        // ObserversModule,
        // OverlayModule,
        // PlatformModule,
        // PortalModule,
        // ScrollingModule,
        // CdkStepperModule,
        // CdkTableModule,

        // Mat
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule
    ]
})
export class MaterialModule {
}
