import { Component, Inject }                                                    from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient }                                                           from '@angular/common/http';
import { HttpCollections }                                                      from '@/environments/environment';
import { ResultBean }                                                           from '@/app/common/result.bean';
import { Router }                                                               from '@angular/router';
import { ReuseTabService }                from '@/app/routes/art-layout/reuse-tab/reuse-tabs.service';
import { USER_TOKEN_SERVICE, TokenModel } from '@/app/core/net/token-dynamic.interface';
import { LocalTokenService }              from '@/app/core/net/local-token.service';
import { MatIconModule }                                                        from '@angular/material/icon';
import { CommonModule }                                                         from '@angular/common';
import { MatFormFieldModule }                                                   from '@angular/material/form-field';
import { MatButtonModule }                                                      from '@angular/material/button';
import { MatInputModule }                                                       from '@angular/material/input';

@Component({
    selector: 'app-login-page',
    imports: [MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './login-page.component.html',
    standalone: true,
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    public loginForm: FormGroup;

    constructor(formBuilder: FormBuilder,
                private _httpClient: HttpClient,
                private router: Router,
                @Inject(USER_TOKEN_SERVICE) private tokenService: LocalTokenService,
                private reuseTabService: ReuseTabService) {
        this.loginForm = formBuilder.group({
            loginName: ['admin', [Validators.required]],
            password: ['1T,)FaE1^W}9R]RLX6U)', [Validators.required]]
        });
    }

    login(): void {
        this.loginForm.getRawValue();
        this._httpClient.post<ResultBean>(HttpCollections.sysUrl + '/auth/login', this.loginForm.getRawValue()).subscribe({
            next: (response) => {
                if (response.code === 200) {
                    this.tokenService.setTokenModel(response.data as TokenModel);
                }
            },
            complete: () => {
                this.reuseTabService.clearCache();
                this.router.navigateByUrl('/bus/sys/menu');
            }
        });
    }
}
