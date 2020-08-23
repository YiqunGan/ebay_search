import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EbaySearch } from './ebaysearch';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private data: EbaySearch[] =[];
  constructor(private http: HttpClient) { }

  result(url){
    return this.http.get(url);
  }

}
