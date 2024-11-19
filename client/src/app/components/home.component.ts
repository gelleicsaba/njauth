import { Component, OnInit, OnDestroy, Inject, ViewChild, WritableSignal, signal, HostListener } from '@angular/core'
import { AppModule } from '../app.common.module'
import { StaticContentService } from '../services/static.content-service'
import { IdeasService } from '../services/ideas.service'
import { SafeHTMLPipe } from '../pipes/safe-html.pipe'
import { LocalStorageService } from '../services/localStorage.service'
import { ClientService } from '../services/client.service'
import { Feeder } from './dev/feeder.dev'
import { ProfileService } from '../services/profile.service'
import { Profile } from '../services/profile'
import { RegData } from '../services/regData'
import { LoginService } from '../services/login.service'


@Component ({
    selector: 'home',
    imports: [AppModule, SafeHTMLPipe, Feeder],
    templateUrl: 'home.component.html',
    styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
    // @HostListener('document:mousemove', ['$event'])
    homeContent: string = ""
    newsContent: string = ""
    rndContent = {"content":"", "title": ""}
    name: string = ""
    email: string = ""
    pass: string = ""
    pass2: string = ""
    captchaValue: boolean = false
    captchaIsReady: WritableSignal<boolean> = signal(false)
    regDisabled: WritableSignal<boolean> = signal(false)
    @ViewChild(Feeder) feeder? :Feeder

    localStorage() : Storage|undefined {
        return document.defaultView?.localStorage;
    }

    constructor (
        private staticContentService: StaticContentService,
        private ideasService : IdeasService,
        private storage: LocalStorageService,
        private clientService: ClientService,
        private profileService: ProfileService,
        private loginService: LoginService
    ) {
    }

    async ngOnInit (): Promise<any> {
        const clientInfo = this.clientService.getClientInfo()
        // console.log(clientInfo)

        const buildContent = (data: any): string => {
            let content = ""
            data.content.forEach( (e: string) => {
                content += `<p>${e}</p>\n`
            })
            return content
        }
        this.homeContent = buildContent(await this.staticContentService.staticContent(1))
        this.newsContent = buildContent(await this.staticContentService.staticContent(2))
        this.rndContent = (await this.ideasService.random())
    }

    onMouseMove(event: Event) {
        this.captchaIsReady.set(true)
        this.captchaValue = true
    }

    async register(event: Event) {

        const hash = this.storage.getHash()
        if (hash) {
            const check = await this.loginService.check(hash)
            if (check.success) {
                this.feeder?.start("You can't sign up while you are logged in.", 2000, "warn")
                return
            }
        }
        if (!this.captchaIsReady()) {
            if (!this.captchaValue) {
                this.feeder?.start("Are you a human? Check it please!", 2000, "warn")
            } else {
                this.feeder?.start("You are really not a human? :) Please wait...", 2000, "danger")
                this.regDisabled.set(true)
                setTimeout(()=> {
                    this.regDisabled.set(false)
                }, 10000)
            }
            return
        }
        if (!this.email || !this.name || !this.pass || !this.pass2) {
            this.feeder?.start("Fill all input please!", 2000, "warn")
            return
        }
        if (this.pass != this.pass2) {
            this.feeder?.start("Specified passwords are not the same!", 2000, "warn")
            return
        }
        if (!this.email.includes("@")) {
            this.feeder?.start("Wrong email address!", 2000, "warn")
            return
        }
        const _this = this
        const regData: RegData =
        {
            name: _this.name,
            email: _this.email,
            pass: _this.pass
        }
        const res = await this.profileService.register(regData)
        if (res && res.success) {
            this.feeder?.start("Signing up has done. Try login.", 8000, "info")
        } else {
            if (res.error && res.error == "in use") {
                this.feeder?.start("Name or email is present. Try another.", 3000, "warn")
            } else {
                this.feeder?.start("I am sorry. There are errors.", 3000, "danger")
            }

        }

    }


}
