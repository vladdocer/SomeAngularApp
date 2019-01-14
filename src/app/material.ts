import { MatCheckboxModule, MatIconModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[ MatButtonModule, MatCheckboxModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatIconModule],
})
export class MaterialModule{

};