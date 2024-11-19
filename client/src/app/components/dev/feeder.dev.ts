import { Component, OnInit, signal, WritableSignal } from '@angular/core'
import { AppModule } from '../../app.common.module'
import { SafeHTMLPipe } from '../../pipes/safe-html.pipe'

@Component ({
    selector: 'feeder',
    imports: [AppModule, SafeHTMLPipe],
    templateUrl: 'feeder.dev.html',
    styleUrl: './feeder.dev.less'
})
export class Feeder implements OnInit {
    visible: WritableSignal<boolean> = signal(false)
    color: WritableSignal<string> = signal("secondary")
    text: WritableSignal<string> = signal("")
    opac: WritableSignal<number> = signal(1.0)

    constructor (
    ) {
    }

    async ngOnInit (): Promise<any> {

    }

    private show() {
        const _this = this
        this.opac.set(0.0)
        const timer = setInterval(() => {
            _this.opac.update(x => x + 0.2)
            if (_this.opac() >= 1) {
                clearInterval(timer)
                return
            }
        }, 50)
    }

    private hide() {
        const _this = this
        this.opac.set(1.0)
        const timer = setInterval(() => {
            _this.opac.update(x => x - 0.2)
            if (_this.opac() <= 0) {
                clearInterval(timer)
                _this.visible.set(false)
                return
            }
        }, 50)
    }

    public start(text: string, time: number = 2000, color: string = "danger") {
        const _this = this
        this.visible.set(true)
        this.opac.set(0.0)
        this.text.set(text)
        const colors = (val: string): string => {
            switch (val) {
                case  "info": return "SlateBlue"; break;
                case "danger": return "Tomato"; break;
                case "warn": return "Orange"; break;
                default: return "Orange"; break;
            }
        }
        this.color.set(colors(color))

        this.show()
        setTimeout(() => {
            _this.hide()
        }, time-500)
    }

}
