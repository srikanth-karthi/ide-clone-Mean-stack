import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompilerService {
  constructor(private http: HttpClient) {}

  getoutput(code: any, mode: string) {
    const data = {
      mode,
      code,
    };
    return this.http.post('http://localhost:3000/run', data);
  }
}
