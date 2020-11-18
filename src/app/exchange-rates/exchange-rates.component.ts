import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-exchange-rates',
  template: `
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <div *ngIf="rates">
      <div *ngFor="let rate of rates">
        <p>{{rate.idestado}}: {{rate.actividad}}</p>
      </div>
    </div>
  `,
//  templateUrl: './exchange-rates.component.html',
//  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {

  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {

    this.apollo
    .watchQuery({
      
      query: gql`
        {
          censos(idestado:"4")
          {     
            id     
            idestado     
            idmunicipio     
            actividad    
            UE   
          }   
        }
      `,

    })
    .valueChanges.subscribe( (result:any) => {
      this.rates = result.data && result.data.censos;
      this.loading = result.loading;
      this.error = result.error;
    });
}

}


