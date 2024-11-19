import { Component, OnInit, OnDestroy, signal, WritableSignal } from '@angular/core'
import { AppModule } from '../app.common.module'
import { Router } from '@angular/router'
import { LocalStorageService } from '../services/localStorage.service'
import { LoginService } from '../services/login.service'
import { StateEventListener } from '../store/stateEventListener'
import { Subscription } from 'rxjs'

@Component ({
    selector: 'navbar',
    imports: [AppModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.less'
})
export class NavbarComponent implements OnInit {
  readonly usrName: WritableSignal<string> = signal("")
  eventSubscription: Subscription|undefined

  constructor (
    private router: Router,
    private stateEvent: StateEventListener<boolean>,
    private storage: LocalStorageService,
    private loginService: LoginService
  ) {

  }

  ngOnInit (): void {

    const name = this.storage.getName()
    if (name) {
      this.usrName.set(name)
    }

    this.eventSubscription = this.stateEvent.subscribe((b?: boolean) => {
      console.log("qq eventSubscription")
      const name = this.storage.getName()
      if (name) {
        this.usrName.set(name)
      } else {
        this.usrName.set("")
      }
    })
  }

  async openMenu (event: Event) {
    const hash = this.storage.getHash()
    if (!hash) {
      this.router.navigate(['/login'])
      return
    }
    const rsp = await this.loginService.check(hash)
    if (!rsp?.success) {
      this.router.navigate(['/login'])
      return
    }

    const menu = document.querySelector('.menu-trigger')
    menu?.dispatchEvent(new Event('click'))
  }

  async logout (event: Event) {
    const hash = this.storage.getHash()
    if (hash != null) {
        const rsp = await this.loginService.logout(hash)
        if (rsp?.success) {
            this.storage.setHash()
            this.storage.setName()
            this.storage.setProfile()
            this.stateEvent.emit(true)
            this.router.navigate(['/login'])
        }
    }
  }

  showprofile (event: Event) {
    console.log("qq profile")
    this.router.navigate(['/profile'])
  }

}
