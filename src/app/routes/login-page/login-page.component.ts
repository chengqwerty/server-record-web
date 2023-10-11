import { Component, Inject }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient }                         from '@angular/common/http';
import { HttpCollections }                    from '@/environments/environment';
import { ResultBean }                         from '@/app/common/result.bean';
import { Router }                             from '@angular/router';
import { STORE_SERVICE_TOKEN, StoreService }  from '@/app/core/store/store-dynamic.interface';
import { ReuseTabService }                 from '@/app/routes/art-layout/reuse-tab/reuse-tabs.service';
import { TOKEN_SERVICE_TOKEN, TokenModel } from '@/app/core/net/token-dynamic.interface';
import { LocalTokenService }               from '@/app/core/net/local-token.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    public loginForm: FormGroup;

    constructor(formBuilder: FormBuilder,
                private _httpClient: HttpClient,
                private router: Router,
                @Inject(TOKEN_SERVICE_TOKEN) private tokenService: LocalTokenService,
                private reuseTabService: ReuseTabService) {
        this.loginForm = formBuilder.group({
            loginName: ['admin', [Validators.required]],
            password: ['1T,)FaE1^W}9R]RLX6U)', [Validators.required]]
        });
    }

    login(): void {
        this.loginForm.getRawValue();
        this._httpClient.post<ResultBean>(HttpCollections.sysUrl + '/auth/userLogin', this.loginForm.getRawValue()).subscribe({
            next: (response)=> {
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
