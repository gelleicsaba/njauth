import { Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { Inject } from '@angular/core'
import CryptoAES from 'crypto-js/aes'
import CryptoENC from 'crypto-js/enc-utf8'
import { Profile } from './profile'

const key = "ajbCAEZy542iwJEi"

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private localStorage () : Storage|undefined {
        return this.document.defaultView?.localStorage;
    }

    constructor (@Inject(DOCUMENT) private document: Document) {
    }

    private encryptText(txt: string) {
        return CryptoAES.encrypt(txt, key).toString()
    }

    private decryptText(txt: string) {
        return CryptoAES.decrypt(txt, key).toString(CryptoENC)
    }

    public getHash (): string|null {
        const hash = this.localStorage()?.getItem('hash')
        return hash ? this.decryptText(hash) : null
    }

    public setHash (hash?: string): void {
        if (hash) {
            this.localStorage()?.setItem('hash', this.encryptText(hash))
        } else {
            this.localStorage()?.removeItem('hash')
        }
    }

    public getName (): string|null {
        const name = this.localStorage()?.getItem('name')
        return name ? this.decryptText(name) : null
    }

    public setName (name?: string): void {
        if (name) {
            this.localStorage()?.setItem('name', this.encryptText(name) )
        } else {
            this.localStorage()?.removeItem('name')
        }
    }

    public getProfile(): Profile|null {
        const profileJson = this.decryptText(this.localStorage()?.getItem('profile')??"{}")
        return profileJson ? JSON.parse(profileJson) : null
    }

    public setProfile(profile?: Profile) {
        if (profile) {
            this.localStorage()?.setItem('profile', this.encryptText(JSON.stringify(profile)))
        } else {
            this.localStorage()?.removeItem('profile')
        }
    }


}