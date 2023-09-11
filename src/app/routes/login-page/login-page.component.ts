import { Component }                          from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient }                         from '@angular/common/http';
import { HttpCollections }                    from '@/environments/environment';
import { ResultBean }                         from '@/app/common/result.bean';
import { Router }                             from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    public loginForm: FormGroup;

    constructor(formBuilder: FormBuilder, private _httpClient: HttpClient, private router: Router) {
        this.loginForm = formBuilder.group({
            loginName: ['admin', [Validators.required]],
            password: ['1T,)FaE1^W}9R]RLX6U)', [Validators.required]]
        });
    }

    login(): void {
        this.loginForm.getRawValue();
        this._httpClient.post<ResultBean>(HttpCollections.sysUrl + '/auth/userLogin', this.loginForm.getRawValue()).subscribe((response) => {
            if (response.code === 200) {
                localStorage.setItem('Auth-Token', response.data);
                this.router.navigateByUrl('/bus/sys/menu');
            }
        });

    }
}
