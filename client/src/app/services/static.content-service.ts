import axios from 'axios'
import path from './server'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class StaticContentService {
  private path?: string

  constructor () {
    this.path = path()
  }

  async staticContent (id :number): Promise<any> {
    return (await axios.get(`${this.path}content/${id}` ) ).data
  }

}
