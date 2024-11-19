import axios from "axios"
import path from "./server"
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  private path?: string

  constructor () {
    this.path = path()
  }

  async getAll (): Promise<any> {
    return (await axios.get(`${this.path}ideas` ) ).data
  }

  async search (text: string): Promise<any> {
    let url = `${this.path}ideas/search?text=${encodeURIComponent(text)}`;
    return (await axios.get(url) ).data
  }

  async random (): Promise<any> {
    return (await axios.get(`${this.path}ideas/random`)).data
  }

}