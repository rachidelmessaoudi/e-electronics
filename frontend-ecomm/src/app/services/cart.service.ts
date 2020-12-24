import { Injectable } from '@angular/core';
import {CartItem} from '../classes/cart-item';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]=[];

  totalPrice:Subject<number>=new BehaviorSubject<number>(0);
  totalQuantity:Subject<number>=new BehaviorSubject<number>(0);

  constructor() { }
  addToCart(theCartItem:CartItem){
    //vérifier si nous avons déja un article dans notre panier
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:CartItem=undefined;
    if(this.cartItems.length>0){
      //trouver l'article dans le panier basé sur ID d'article
      existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id=== theCartItem.id);


      //vérifier si nous avons réellement trouvé cet élément donné
      alreadyExistsInCart=(existingCartItem!=undefined);
    }

    if(alreadyExistsInCart){
      //si déjaExistsinCart incrémentons simplement la quantité de cet article
      existingCartItem.quantity++;
    }
    else {
      //nous ajoutons simplement l'élément au tableau
      this.cartItems.push(theCartItem);
    }
    //calculera le prix total du panier et la quantité totale
    this.computeCartTotals();
  }

  computeCartTotals(){
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }
    //publier les nouvelles valeurs pour totalPrice et totalQuantity... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //connecter à un panier de données juste à des fins de débogage
    this.logCartData(totalPriceValue,totalQuantityValue);
  }

  private logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name:${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice:${totalPriceValue.toFixed(2)},totalQuantity:${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    //get index of item in the array
    const itemIndex=this.cartItems.findIndex(
      tempCartItem => tempCartItem.id == theCartItem.id
    );
    //if found remove the item from the array at the given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);

      this.computeCartTotals();
    }
  }
}
