import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** 验证是否只包含，英文、数字和下划线 */
export function numEngUnderline(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg=/^[0-9a-z_A-Z]*$/;
        const forbidden = reg.test(control.value);
        return forbidden ? null : {numEngUnderline: {value: control.value}};
    };
}

export const Validations = {
    numEngUnderline: numEngUnderline
};
