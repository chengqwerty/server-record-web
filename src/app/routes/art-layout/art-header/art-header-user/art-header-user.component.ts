import { Component, Inject }                     from '@angular/core';
import { MatButtonModule }                       from '@angular/material/button';
import { MatMenuModule }                         from '@angular/material/menu';
import { Router, RouterLink }                    from '@angular/router';
import { LOCAL_USER_SERVICE, User, UserService } from '@/app/core/service/user.service';
import { NgOptimizedImage }                      from '@angular/common';
import { MatIconModule }                         from '@angular/material/icon';
import { ResultBean }                            from '@/app/common/result.bean';
import { HttpCollections }                       from '@/environments/environment';
import { USER_TOKEN_SERVICE }                    from '@/app/core/net/token-dynamic.interface';
import { LocalTokenService }                     from '@/app/core/net/local-token.service';
import { HttpClient }                            from '@angular/common/http';
import { ReuseTabService }                       from '@/app/routes/art-layout/reuse-tab/reuse-tabs.service';
import { ReuseTabStrategy }                      from '@/app/routes/art-layout/reuse-tab/reuse-tabs.strategy';

@Component({
    selector: 'app-art-header-user',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterLink,
        NgOptimizedImage
    ],
    templateUrl: './art-header-user.component.html',
    styleUrl: './art-header-user.component.scss'
})
export class ArtHeaderUserComponent {

    public user: User | null = null;


    constructor(@Inject(USER_TOKEN_SERVICE) private tokenService: LocalTokenService,
                @Inject(LOCAL_USER_SERVICE) private userService: UserService,
                private http: HttpClient,
                private router: Router,
                private reuseTabService: ReuseTabService) {
       this.user = this.userService.user;
    }

    restore() {

    }

    logout() {
        this.http.post<ResultBean>(HttpCollections.sysUrl + '/auth/logout', {token: this.tokenService.getToken()}).subscribe({
            next: (response) => {
            },
            complete: () => {
                this.tokenService.clear();
                this.reuseTabService.clearCache();
                this.router.navigateByUrl('/login');
            }
        });
    }

}
