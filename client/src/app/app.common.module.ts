import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { DatePipe } from '@angular/common'

import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatDividerModule } from '@angular/material/divider'
import { MatInputModule } from '@angular/material/input'
import { MatChipsModule } from '@angular/material/chips'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatMenuModule } from '@angular/material/menu'
import { AsyncPipe } from '@angular/common'

@NgModule({
    imports: [FormsModule, DatePipe, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
        MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
        MatToolbarModule, MatGridListModule, MatDividerModule, MatInputModule, MatChipsModule,
        MatSnackBarModule, MatMenuModule, AsyncPipe ],
    //imports: [ DatePipe, AsyncPipe],

    exports: [FormsModule, DatePipe, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
        MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
        MatToolbarModule, MatGridListModule, MatDividerModule, MatInputModule, MatChipsModule,
        MatSnackBarModule, MatMenuModule, AsyncPipe ],
    providers: [
        DatePipe,
        MatDatepickerModule,
        provideNativeDateAdapter()
    ],
})
export class AppModule {
}