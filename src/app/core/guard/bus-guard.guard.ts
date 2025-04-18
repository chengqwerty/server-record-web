import { CanActivateFn } from '@angular/router';

export const busGuardGuard: CanActivateFn = (route, state) => {
    console.log(route);
    return true;
};
