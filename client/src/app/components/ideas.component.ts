import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core'
import { AppModule } from '../app.common.module'
import { IdeasService } from '../services/ideas.service'
import { SafeHTMLPipe } from '../pipes/safe-html.pipe'
import { buttons } from '../ideas/idea-buttons'

@Component ({
    selector: 'ideas',
    imports: [AppModule, SafeHTMLPipe],
    templateUrl: './ideas.component.html',
    styleUrl: './ideas.component.less'
})
export class IdeasComponent implements OnInit {
    ideas: Array<any> = []
    searchText = signal("")
    buttons: any = buttons

    constructor (private ideasService :IdeasService) {
      this.initEffect()
    }

    buildText () :string {
      let res = ""
      let f = true
      for (const btn of buttons.filter(q => q.check) ) {
        res += f ? btn.title : ` ${btn.title}`
        f = false
      }
      res = res == '' ? this.searchText() : `${res} ${this.searchText()}`
      return res
    }

    initEffect () {
      effect(async () => {
        this.ideas = (await this.ideasService.search(this.buildText())).items
      })
    }

    async ngOnInit (): Promise<any> {
        this.ideas = (await this.ideasService.getAll()).items
    }

    async btnClick (event: Event, button: any) {
      button.check = ! button.check
      this.ideas = (await this.ideasService.search(this.buildText())).items
    }

}
