import { Component, OnInit, OnDestroy, signal, WritableSignal, ViewChild } from '@angular/core'
import { AppModule } from '../app.common.module'
import { LoginService } from '../services/login.service'
import { LocalStorageService } from '../services/localStorage.service'
import { StateEventListener } from '../store/stateEventListener'
import { Router } from '@angular/router'
import { Feeder } from './dev/feeder.dev'

@Component ({
    selector: 'login',
    imports: [AppModule, Feeder],
    templateUrl: './login.component.html',
    styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
    name: WritableSignal<string> = signal("")
    pass: WritableSignal<string> = signal("")
    @ViewChild(Feeder) feeder? :Feeder

    constructor (
      private loginService: LoginService,
      private localStorageService: LocalStorageService,
      private stateEventListener: StateEventListener<boolean>,
      private router: Router
    ) {
    }

    ngOnInit (): void {

    }

    async loginClick (event: Event) {
      event.preventDefault()
      const name = this.name()
      const pass = this.pass()
      const res = (await this.loginService.login(name, pass))
      if (res.success == undefined || !res.success) {
        this.localStorageService.setHash()
        this.localStorageService.setName()
        this.localStorageService.setProfile()
        this.stateEventListener.emit(true)
        this.feeder?.start("Invalid username or password!")
        return
      }
      const resName = res.userData.name
      this.localStorageService.setHash(res.hash)
      this.localStorageService.setName(resName)
      this.localStorageService.setProfile(res.userData)
      this.stateEventListener.emit(true)
      this.router.navigate(['/'])
    }

}
