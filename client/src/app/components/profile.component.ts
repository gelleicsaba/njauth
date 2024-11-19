import { Component, OnInit, ViewChild, OnDestroy, signal, WritableSignal } from '@angular/core'
import { AppModule } from '../app.common.module'
import { LoginService } from '../services/login.service'
import { LocalStorageService } from '../services/localStorage.service'
import { StateEventListener } from '../store/stateEventListener'
import { Router } from '@angular/router'
import { Profile } from '../services/profile'
import { FeederModule } from './dev/feeder.module'
import { Feeder } from './dev/feeder.dev'
import { ProfileService } from '../services/profile.service'

@Component ({
    selector: 'profile',
    imports: [AppModule, FeederModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.less'
})
export class ProfileComponent implements OnInit {
  @ViewChild(Feeder) feeder? :Feeder
  name: string = ""
  fullname: string = ""
  email: string = ""
  interests: string = ""
  reddit: string = ""
  publicCheck: boolean = false

  constructor (
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private stateEventListener: StateEventListener<boolean>,
    private router: Router,
    private profileService: ProfileService
  ) {
  }

  ngOnInit (): void {
    const pr: Profile|null = this.localStorageService.getProfile()
    console.log(pr)
    this.name = pr?.name??""
    this.fullname = pr?.fullname??""
    this.email = pr?.email??""
    this.interests = pr?.interest??""
    this.reddit = pr?.reddit??""
    this.publicCheck = pr?.public??false
  }

  async save (event: Event) {

    const hash = this.localStorageService.getHash();
    const rsp = await this.loginService.check(hash??"invalid-hash")
    if (!rsp?.success) {
      this.feeder?.start("There was an error. Try to sign out & login again!", 1500, "danger")
      return
    }

    const data: Profile = {
      fullname: this.fullname,
      interest: this.interests,
      reddit: this.reddit,
      public: this.publicCheck
    }

    const saved = await this.profileService.save(data)

    this.feeder?.start("Profile has been saved.", 1500, "info")
  }



}
