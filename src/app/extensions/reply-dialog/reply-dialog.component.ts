import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface ReplyDialogData {
  type: 'success',
  message: 'success'
}

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.scss']
})
export class ReplyDialogComponent implements OnInit {

  public replyTypeClass = {
    'reply-dialog-success': false,
    'reply-dialog-warning': false,
    'reply-dialog-error': false
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReplyDialogData) {
    let key = ('reply-dialog-' + data.type) as ('reply-dialog-success' | 'reply-dialog-warning' | 'reply-dialog-error');
    this.replyTypeClass[key] = true;
  }

  ngOnInit(): void {
  }

}
