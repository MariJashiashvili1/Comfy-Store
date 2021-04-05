// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

// specific imports
// addToCart-ის წამოღება დაგვჭირდა setupCard-დან, რადგან ის გვჭირდება, რომ როცა ინდივიდუალური პროდუქტის გვერდზე - addToCart-ზე დავაქლოქებთ, გამოიტანოს sidebar-ი. 
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');


// cart product
let productID;

window.addEventListener('DOMContentLoaded', async function () {
     
    // ამ urlID-ს მივანიჭეთ ის ლოკაცია, რომელიც თითოეული პროდუქტის ჩატვირთვისას გამოჩნდება URL-ში.
    const urlID = window.location.search;
    try {
        const response = await fetch(`${singleProductUrl}${urlID}`);
        if (response.status >= 200 && response.status <= 299) {
            const product = await response.json();
            // grab data
            const { id, fields } = product;
            productID = id;
            const { name, company, price, colors, description } = fields;
            const image = fields.image[0].thumbnails.large.url;

            // set values
            // აქ მივუთითეთ, რომ გვიჩვენოს პროდუქტის დასახელება, ინდივიდუალურად, ზემოთ, title-ში.
            document.title = `${name.toUpperCase()} | comfy`;
            // აქ ვუთხარით, რომ გვიჩვენოს ასევე პროდუქტის დასახელება ინდივიდუალურად, ოღონდ ქვემოთ.
            pageTitleDOM.textContent = `Home / ${name}`

            // აქ ჩვენი api-დან წამოვიღეთ სურათი, ავეჯის სახელი, კომპანიის სახელი, ფასი, აღწერა და ფერები ინდივიდუალურად, ანუ ყველა პროდუქტს განსხვავებული რაოდენობის ფერები ექნება.
            imgDOM.src = image;
            titleDOM.textContent = name;
            companyDOM.textContent = `by ${company}`;
            priceDOM.textContent = formatPrice(price);
            descDOM.textContent = description;
            colors.forEach((color) => {
                const span = document.createElement('span');
                span.classList.add('product-color');
                span.style.backgroundColor = `${color}`;
                colorsDOM.appendChild(span);
            })

        }
        else {
            console.log(response.status, response.statusText);
            centerDOM.innHTML = `
            <div> 
            <h3 class="error">sorry, something went wrong</h3>
            <a href="index.html" class="btn">back home</a>
            </div>
            `
        }
        
    } catch (error) {
        console.log(error);
    }
    


    // show product when page loads
    const loading = getElement('.page-loading');
    loading.style.display = 'none';
});



// add to cart button
cartBtn.addEventListener('click', () => {
    addToCart(productID);
})