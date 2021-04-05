// import
import {
    getStorageItem,
    setStorageItem,
    formatPrice,
    getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

// set items
const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
    let item = cart.find((cartItem) => cartItem.id === id);
    // აქ დაგვიბრუნებს undefined-ს რადგან ვუთხარით, რომ ეპოვა cartItem - თუ მისი id ემთხვეოდა arsebuli პროდუქტის id-ს, მაგრამ პროდუქტი არ გვაქვს არაფერი ჯერ.
    // console.log(item);

    if (!item) {
        let product = findProduct(id);
        // add item to the cart
        // აქ ვუთხარით , რომ პროდუქტმა წამოიღოს ყველაფერი, რაც აქვს. პროდუქტის რაოდენობა იყოს 1, რადგან თუ ჯერ არ არის პროდუქტი წამოღებული, მისი რაოდენობა უდრიდეს 1-ს.  
        product = { ...product, amount: 1 };
        // აქ ვუთხარით, რომ ყველა მნიშვნელობა წამოიღოს card-ის და დაემატოს ისინი product-s.
        cart = [...cart, product];

        // add item to the DOM
        // სხვა არის დავამატოთ item-ბი cart-ში, და სულ სხვაა ის დავამატოთ DOM-ში
        addToCartDOM(product);
    }
    else {
        // epdate values
        const amount = increaseAmount(id);
        const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
        const newAmount = items.find((value) => value.dataset.id === id);
        newAmount.textContent = amount;
    }
    // add one to the item count
    displayCartItemCount();
    // display cart totals
    displayCartTotal();
    // set cart in local storage
    setStorageItem('cart', cart);
    // more stuff coming up

    // opencart-ს როცა გამოვიძახებთ, გაიხსნება sidebar-ი.
    openCart();

    // ფუნქცია იმისთვის, რომ cart-is აიქონზე მდგომი ციფრი შეიცვალოს პროდუქტის კალათაში ჩამატებასთან ერთად, ანუ გვიჩვენოს, რამდენი პროდუქტი გვაქვს
};
function displayCartItemCount() {
    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    cartItemCountDOM.textContent = amount;
}

// ფუნქცია იმისთვის, რომ ფასის შეაჯამოს ყველა იმ პროდუქტის, რომელიც გვაქვს კალათაში.
function displayCartTotal() {
    let total = cart.reduce((total, cartItem) => {
        return (total += cartItem.price * cartItem.amount);
    }, 0);
    cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
}



function displayCartItemsDOM() {
    cart.forEach((cartItem) => {
        addToCartDOM(cartItem);
    })
}

function removeItem(id) {
    cart = cart.filter((cartItem) => cartItem.id !== id);
}

function increaseAmount(id) { 
    let newAmount;
    cart = cart.map((cartItem) =>
    {
        if (cartItem.id === id) {
            newAmount = cartItem.amount + 1;

            cartItem = { ...cartItem, amount: newAmount };
        } 
        return cartItem;  
    })

    return newAmount;
};

function decreaseAmount(id) { 
    let newAmount;
    cart = cart.map((cartItem) =>
    {
        if (cartItem.id === id) {
            newAmount = cartItem.amount - 1;

            cartItem = { ...cartItem, amount: newAmount };
        } 
        return cartItem;  
    })

    return newAmount;
};
function setupCartFunctionality() { 
    cartItemsDOM.addEventListener('click', function (e) {
        const element = e.target;
        const parent = e.target.parentElement;
        const id = e.target.dataset.id;
        const parentID = e.target.parentElement.dataset.id;

        // remove
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(id);
            element.parentElement.parentElement.remove();
        }
        // increase
        if (parent.classList.contains('cart-item-increase-btn')) {
            const newAmount = increaseAmount(parentID);

            // nextSibling - გამოვიყენეთ, რადგან 'cart-item-increase-btn' - ამ კლასის, შემდეგი კლასი, ანუ 'cart-item-amount' - გვჭირდება, რომ ფასი შეიცვალოს.
            parent.nextElementSibling.textContent = newAmount;
        }

        // decrease
        if (parent.classList.contains('cart-item-decrease-btn')) {
            const newAmount = decreaseAmount(parentID);
            if (newAmount === 0) {
                removeItem(id);
                parent.parentElement.parentElement.remove();
            }
            else {
                parent.previousElementSibling.textContent = newAmount;
            }
        }
        displayCartItemCount();
        displayCartTotal();
        setStorageItem('cart', cart);
    })
}
const init = () => {
    // აქ ჯერჯერობით დაგვიბრუნებს ცარიელ მასივს, რადგან მანამდე, utils-ში ვუთხარით, რომ თუ ელემენტები არ არსებობს, რის წამოღებასაც შევძლებთ, მაშინ დაგვიბრუნოს ცარიელი მასივი.
    // console.log(cart);


    // display amount of cart items
    displayCartItemCount();

    // display total
    displayCartTotal();
    // add all cart items to the dom
    displayCartItemsDOM();
    // setup cart functionality
    setupCartFunctionality();
};
init();