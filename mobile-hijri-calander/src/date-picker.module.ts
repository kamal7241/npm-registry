import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateDialogComponent } from './components/date-dialog.component';
import { DatePickerProvider } from './providers/date-picker.provider';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [DateDialogComponent],
    exports: [DateDialogComponent],
})
export class DatePickerModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DatePickerModule,
            providers: [DatePickerProvider],
        }
    }
}