import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { Observable, from } from 'rxjs';

//import { WhiteCheeseRecieveOrderService } from './white-cheese-recieve-order.service';
import { map } from 'rxjs/operators';
export function existingPatchNumberValidator() {

    /*return (control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null> => {
        return WhiteCheeseRecieveOrderService.checkPatchNumberExist(control.value).pipe(map(users=>{
            return (users)?{"PatchNumberExists":true}:null
        }));
    };*/
}
