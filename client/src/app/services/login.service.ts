import axios from "axios"
import path, { headers } from "./server"
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private path?: string

  constructor () {
    this.path = path()
  }

  private authHeader(hash: string): object {
    return {
      headers: {
        "hash": hash
      }
    }
  }

  async login (name: string, pass: string): Promise<any> {
    const data = { user: name, pass: pass }
    return (await axios.put(`${this.path}user/login`, data ) ).data
  }

  async logout (hash: string): Promise<any> {
    return (await axios.delete(`${this.path}user/logout`, {
      headers: {
        "hash": hash
      },
      data: {}
    })).data
  }

  async check (hash: string): Promise<any> {
    return (await axios.post(`${this.path}user/check`, {}, this.authHeader(hash) )).data
  }

}