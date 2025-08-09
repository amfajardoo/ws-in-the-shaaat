import { Pipe, PipeTransform } from '@angular/core';
import { FieldValue, Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'fromServerTimestampToLocalString',
})
export class FromServerTimestampToLocalStringPipe implements PipeTransform {
  transform(value: Timestamp | FieldValue | null | undefined): string {
    if (!value) return '';

    if (value instanceof Timestamp) {
      return value.toDate().toLocaleString();
    }

    return '';
  }
}
