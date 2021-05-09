import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any): { key: any; value: any }[] {
    return Object.keys(value).map((key) => {
      return { key, value: value[key] };
    });
  }
}
