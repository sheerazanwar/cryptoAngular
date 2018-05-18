import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ExchangeComponent } from '../exchange.component';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit
{
  objectKeys = Object.keys;
  cryptos : any;

  constructor(private authService:AuthService, private exchange:ExchangeComponent) { }

  coin(crypto)
  {
    this.exchange.prices(crypto);
    this.exchange.trade(crypto);
  }

  ngOnInit()
  {
    this.authService.getprice().subscribe(res=>
    {
      this.cryptos = res;
    });
  }
}
