import axios from "axios"
import path, { headers } from "./server"
import { Injectable } from '@angular/core'
import { Profile } from "./profile"
import { RegData } from "./regData"
import { LocalStorageService } from "./localStorage.service"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private path?: string

  constructor (
    private localStorageService: LocalStorageService
  ) {
    this.path = path()
  }

  private authHeader(hash: string): object {
    return {
      headers: {
        "hash": hash
      }
    }
  }

  async save (data: Profile): Promise<any> {
    const hash = this.localStorageService.getHash()
    return (await axios.post(`${this.path}profile`, data, this.authHeader(hash??"invalid-hash") ) ).data
  }

  async register (data: RegData): Promise<any> {
    return (await axios.put(`${this.path}profile`, data)).data
  }


}