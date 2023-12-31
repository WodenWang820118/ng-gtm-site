import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  createCookie(
    name: string,
    value: string,
    days?: number,
    path: string = '/',
    domain?: string,
    secure: boolean = false
  ): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie =
      name +
      '=' +
      (value || '') +
      expires +
      '; path=' +
      path +
      (domain ? '; domain=' + domain : '') +
      (secure ? '; secure' : '');
  }

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getAllCookies(): { [key: string]: string } {
    const pairs = document.cookie.split(';');
    const cookies: { [key: string]: string } = {};
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }
  updateCookie(
    name: string,
    value: string,
    days?: number,
    path: string = '/',
    domain?: string,
    secure: boolean = false
  ): void {
    // Updating a cookie is the same as creating a new one with the same name
    this.createCookie(name, value, days, path, domain, secure);
  }

  deleteCookie(name: string, path: string = '/', domain?: string): void {
    // Deleting a cookie is done by setting its expiration date to a past date
    document.cookie =
      name +
      '=; path=' +
      path +
      (domain ? '; domain=' + domain : '') +
      '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }

  // Assuming that the consent status is stored in a cookie named 'consentStatus'
  getConsentStatus(): string | null {
    return this.getCookie('consentStatus');
  }

  setConsentStatus(status: string): void {
    this.createCookie('consentStatus', status, 365); // Save the consent status for 1 year, adjust as needed.
  }
}
