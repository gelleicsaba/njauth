import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { Feeder } from './feeder.dev'

@NgModule({
    imports: [FormsModule, Feeder ],
    exports: [FormsModule, Feeder ]
})
export class FeederModule {
}