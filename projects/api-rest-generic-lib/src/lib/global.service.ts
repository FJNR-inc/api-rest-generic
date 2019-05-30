import {HttpHeaders} from '@angular/common/http';

export default class GlobalService {

  public acceptLanguage: string;

  authorizationOption = 'Authorization';

  getHeaders() {
    const options = {
      'Content-Type': 'application/json',
      'Accept-Language': this.acceptLanguage
    };

    const token = localStorage.getItem('token');
    if (token) {
      options[this.authorizationOption] = 'Token ' + token;
    }
    return new HttpHeaders(options);
  }
}
