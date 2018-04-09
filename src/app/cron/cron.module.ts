import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { CronComponent } from './component/cron.component'

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [CronComponent],
    declarations: [CronComponent],
    providers: [],
})
export class CronModule {

}
