import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ElectronicsFormService} from '../../services/electronics-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice:number=0;
  totalQuantity:number=0;

  creditCardYears: number[]=[];
  creditCardMonths: number[]=[];

  constructor(private formBuilder: FormBuilder,
              private electronicsFormService:ElectronicsFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });

    //populate creadit card months
    const startMonth: number=new Date().getMonth()+1;
    console.log("startMonth: "+startMonth);

    this.electronicsFormService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonths=data;
      }
    );
    //populate credit card years
    this.electronicsFormService.getCreditCardYears().subscribe(
      data =>{
        console.log("Retrieved credit card years: "+JSON.stringify(data));
        this.creditCardYears=data;
      }
    );
  }
  copyShippingAddressToBillingAddress(event) {

    if(event.target.cheked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.value);
    }else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is "+this.checkoutFormGroup.get('customer').value.email);
  }


}
