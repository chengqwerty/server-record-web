import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-server-namespace',
  templateUrl: './server-namespace.component.html',
  styleUrls: ['./server-namespace.component.scss']
})
export class ServerNamespaceComponent implements OnInit {
  public serverForm: FormGroup;

  public displayedColumns: string[] = ['areaName', 'name', 'description', 'createTime', 'symbol'];


  constructor(private formBuilder: FormBuilder) {
    this.serverForm = this.formBuilder.group({
      serverIp: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    console.log(this.serverForm.get('serverIp')?.invalid);
  }

  ngOnInit(): void {
  }

}
