import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from "rxjs/Observable";

@Component(
{
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})

export class ExchangeComponent implements OnInit
{
  form:FormGroup;
  form1:FormGroup;
  price;
  req;
  coin;
  pricecolor = 'black';
  connectionData;
  oldprice=0;
  askk=[];
  p1;
  a1;
  p2;
  a2;


  constructor(private formBuilder: FormBuilder, private chatService: ChatService, private authService: AuthService)
  {
    this.createForm();
  }
  createForm()
  {
    this.form = this.formBuilder.group(
    {
      Price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Ammount: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Total: ['']
    });

    this.form1 = this.formBuilder.group(
    {
      Price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Ammount: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
        this.validatePrice
      ])],
      Total: ['']
    });
  }

  validatePrice(controls)
  {
    const regExp = new RegExp(/[0-9]+(\.[0-9][0-9]?)?/);
    if (regExp.test(controls.value))
    {
      return null;
    }
    else
    {
      return { 'validatePrice': true }
    }
  }

  prices(crypto)
  {
    this.coin= crypto.concat("BTC");
    this.chatService.checkPrice(this.coin);
  }

  trade(crypto)
  {
    this.coin= crypto.concat("BTC");
    this.chatService.checktrade(this.coin);
  }

  onBuySubmit()
  {
    const buy = {
      type: "buy",
      quantity: this.form.get('Ammount').value,
      price: this.form.get('Price').value,
      coinName: "XRPBTC"
    }
    this.authService.buy_sell(buy).subscribe(data=>
    {
      console.log("Buy");
    });
  }

  onSellSubmit()
  {
    const sell = {
      type: "sell",
      quantity: this.form1.get('Ammount').value,
      price: this.form1.get('Price').value,
      coinName: "XRPBTC"
    }
    this.authService.buy_sell(sell).subscribe(data=>
    {
      console.log("Sell");
    });
  }

  ngOnInit()
  {
    this.chatService.getPrice().subscribe(data =>
    {
      this.price=data;
      this.req=this.price.volume.substring(0, 10);

      if(this.oldprice>this.price.close)
      {
        this.pricecolor="red";
      }
      else if(this.oldprice<this.price.close)
      {
        this.pricecolor="green";
      }
      this.oldprice=this.price.close;
    });

    this.connectionData = this.chatService.gettrade().subscribe(data =>
    {
      console.log(data);
    });

    setTimeout(() =>
    {
      this.prices("XRP");
    }, 500);

    setTimeout(() =>
    {
      this.trade("XRP");
    }, 500);
  }
}
