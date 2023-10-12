import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** 验证是否只包含，英文、数字和下划线，第一个字符必须是英文字母 */
export function engNumUnderline(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg=/^[a-z_\-A-Z][0-9a-z_\-A-Z]*$/;
        const forbidden = reg.test(control.value);
        return forbidden ? null : {numEngUnderline: {value: control.value}};
    };
}

export const Validations = {
    numEngUnderline: engNumUnderline
};
