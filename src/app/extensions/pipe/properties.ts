import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert Object to array of keys.
 */
@Pipe({
    name: 'properties',
    standalone: false
})
export class PropertiesPipe implements PipeTransform {

    transform(value: {}): string[] {
        if (!value) {
            return [];
        }
        return Object.keys(value);
    }

}
