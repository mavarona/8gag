import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder',
})
export class PlaceHolderPipe implements PipeTransform {

  transform(value: string, byDefault: string = 'Not label') {

    return ( value ) ? value : byDefault;

  }
}
