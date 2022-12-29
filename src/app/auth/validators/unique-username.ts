import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs';
import { ExpressionStatement } from '@angular/compiler';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: AbstractControl): any => {
    const { value } = control;

    return this.authService.usernameAvailable(value)
      .pipe(
        map((value) => {
          console.log(value);
          return null;
        }),
        catchError(err => {
          if (err.error.username) {
            return of({ nonUniqueUserName: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  };
}
