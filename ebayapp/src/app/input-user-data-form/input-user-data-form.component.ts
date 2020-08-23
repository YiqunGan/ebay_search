import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidatorFn, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EbaySearch} from '../ebaysearch';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { DisplayService} from '../display.service';

const MyPriceValidator: ValidatorFn = (fg: FormGroup)=> {
  const start = fg.get('minprice').value;
  const end = fg.get('maxprice').value;
  return start==null  ||end==null|| start < end && start>=0 &&end>=0
    ? null
    : {range: true};
};

@Component({
  selector: 'app-input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})
export class InputUserDataFormComponent implements OnInit {
  ebaysearch: EbaySearch = {
    keyword: null,
    minprice: null,
    maxprice: null,
    condition: null,
    seller: null,
    shipping: null,
    sortorder: null
    };
  inputError = false;
  data:any = [];
  keyword=null;

  submitted = false;
  form: FormGroup;

  invalidKeyword(){
    return (this.submitted && this.form.controls.keyword == null);
  }

  invalidMinPrice(){
    if(this.submitted && this.form.controls.minprice.value<0 ){
      return true;
    }
    return false;
  }
  invalidMaxPrice(){
    if(this.submitted && this.form.controls.maxprice.value!=null && (this.form.controls.maxprice.value <0|| this.form.controls.maxprice.value  < this.form.controls.minprice.value)){
      return true;
    }
    return false;
  }

  constructor(private fb: FormBuilder,private http: HttpClient) {
    console.log(this.ebaysearch.minprice);

    this.form = this.fb.group({
      keyword:[null, Validators.required],
      minprice: [null],
      maxprice: [null],
      new: [false],
      used:[false],
      verygood: [null],
      good:  [null],
      acceptable: [null],
      return:[null],
      free:[null],
      expedited:[null],
      sortby: ['1'],
      curUrl:[null]
    }, {validator: MyPriceValidator});
  }
  // { validator: MyPriceValidator}
  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    //console.log(form.value);
    this.submitted= true;
    this.keyword = this.form.value.keyword;
    //var display = this.displayService;
    if(this.form.invalid == true){
      return;
    } else  {
      console.log(this.form.value);
      //let data: any = Object.assign(this.form.value);
      const searchParams= {
        params:this.form.value
      };
      this.http.get('https://ebaybackend-yiqun.wl.r.appspot.com/api/display',searchParams).subscribe((data:any)=>{
        //console.log(data);
        this.data  = data;
      });
      //console.log(this.data);
    }
  }

  clearForm(){
    this.submitted=false;
    this.form.reset({
      keyword:null,
      minprice: null,
      maxprice: null,
      new: null,
      used:  null,
      verygood: null,
      good:  null,
      acceptable: null,
      return:null,
      free: null,
      expedited: null,
      sortby: '1',
      curUrl: null
    });
  }
}
