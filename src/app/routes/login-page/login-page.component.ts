import { Component }                          from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar }                        from '@angular/material/snack-bar';
import { HttpClient }                   from '@angular/common/http';
import { environment, HttpCollections } from '@/environments/environment';
import { ResultBean }                         from '@/app/common/result.bean';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    public loginForm: FormGroup;

    constructor(formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _httpClient: HttpClient) {
        this.loginForm = formBuilder.group({
            loginName: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    login(): void {
        this.loginForm.getRawValue();
        this._httpClient.post<ResultBean>(HttpCollections.sysUrl + "/auth/userLogin", this.loginForm.getRawValue()).subscribe((response) => {
            console.log(response.data);
        });
        this._snackBar.open("开始登录", "Success", {politeness: 'off'});
    }
}
