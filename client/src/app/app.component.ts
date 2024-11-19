import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AppModule } from './app.common.module'
import { NavbarComponent } from './components/navbar.component'

@Component ({
    selector: 'app-root',
    imports: [AppModule, NavbarComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'client'
}
