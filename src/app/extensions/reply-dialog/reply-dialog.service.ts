import { Injectable }                               from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ReplyDialogComponent }                     from "./reply-dialog.component";

interface ReplyDialogConfig extends MatDialogConfig {
  duration: number
}

@Injectable({
  providedIn: 'root'
})
export class ReplyDialogService {

  constructor(private matDialog: MatDialog) {
  }

  public open(type: 'success' | 'error' | 'warning', message: string, config?: ReplyDialogConfig,): void {
    let matDialogConfig = Object.assign({data: {type: type, message: message}}, config);
    let matDialogDef = this.matDialog.open(ReplyDialogComponent, matDialogConfig);
    if (config && config.duration) {
      setTimeout(() => {
        matDialogDef.close(true);
      }, config.duration);
    }
  }

}
