// Initialize Firebase
$(document).ready(function(){

 $('#btn').click(function (){
 	var  googleAuthProvider=new firebase.auth.GoogleAuthProvider
 	firebase.auth().signInWithPopup(googleAuthProvider)
 	.then(function(data){
 		console.log(data);
 	})
 	.catch(function(error){
 		console.log (error);

 	})

 })     
});

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class MembresService {
Membres:Observable<any[]>;
  constructor(public af:AngularFireDatabase) {
   
   }
   getMembres(){
    this.Membres = this.af.list<any>('/members').valueChanges() as Observable <membre[]>;
     return this.Membres;
   }
  

}
interface membre {
  $key?:string;
  member_id?:string;
  first_name?:string;
  last_name?:string;
  email?:string;
  phone?:string;
  poste?:string;
}
import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MembresService} from '../../services/membres.service';
import {MembreDetailComponent} from '../membre-detail/membre-detail.component';
import { equal } from 'assert';

const newLocal: any = 0;

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  Managers=new Array <membre>();
  CoManagers: membre[];
  Mems:membre[];

  constructor(private membreservice:MembresService) { }

  ngOnInit() {
    
    this.membreservice.getMembres().subscribe(Mems=>{
      this.Mems=Mems;
      let j=0;
      let k=0;
      for( let i=0;i<this.Mems.length;i++){

          if (this.Mems[i].poste =='Manager') 
          {
            this.Managers[j]=this.Mems[i];
            j++;
          }
          if (this.Mems[i].poste=='CoManager') 
          {  
            this.CoManagers[k]=this.Mems[i];
            k++;
          }
      }   
    })
  }
}

interface membre {
  $key?:string;
  member_id?:string;
  first_name?:string;
  last_name?:string;
  email?:string;
  phone?:string;
  poste?:string;
}
import { Component, OnInit, Input} from '@angular/core';
@Component({
  selector: 'app-membre-detail',
  templateUrl: './membre-detail.component.html',
  styleUrls: ['./membre-detail.component.css']
})
export class MembreDetailComponent implements OnInit {

  constructor() { }
  @Input() membre: membre;
  ngOnInit() {
  }

}
interface membre {
  $key?:string;
  member_id?:string;
  first_name?:string;
  last_name?:string;
  email?:string;
  phone?:string;
  poste?:string;
}
<mat-card class="example-card" class ="col-xs-12 col-sm-3 col-md-4 col-lg-3 " style= "margin-bottom : 20px; margin-left : 10px;  ">
    
    <mat-card-header>
        <div mat-card-avatar class="example-header-image" [style.backgroundImage]="'url('+ membre.image +')'"></div>
        <mat-card-title>{{membre.first_name}} {{membre.last_name}}</mat-card-title>
        <mat-card-subtitle>{{membre.poste}}</mat-card-subtitle>
      </mat-card-header>
    <mat-card-content>
      <p>
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
          Phasellus volutpat neque ac dui mattis vulputate.

      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>More</button>
    
    </mat-card-actions>
  </mat-card>
  
