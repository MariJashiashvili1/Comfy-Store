import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
    const priceInput = getElement('.price-filter');
    const priceValue = getElement('.price-value');

    // setup filter
    let maxPrice = store.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    // console.log(maxPrice); output: მაქსიმუმი სიდიდით
    // აქ დავამრგვალეთ
    maxPrice = Math.ceil(maxPrice / 100);
    // ის რასაც მოვნიშნავთ, მაქსიმუმი იქნება თავიდან default-ად მონიშნული
    priceInput.value = maxPrice;
    // max-ეს ატრიბუტი api-ში გვაქვს და მივუთითეთ, რომ აქ იყოს მაქსიმუმი, იმის, რაც გვაქვს.
    priceInput.max = maxPrice;
    // აქ მივუთითეთ მინიმუმი, ანუ 0;
    priceInput.min = 0;
    priceValue.textContent = `Value : $${maxPrice}`;

    priceInput.addEventListener('input', function () {
        // აქ parse დაგვჭირდა იმიტომ რომ value- გამოჰქონდა, როგორც სტრინგი, ეს კი არ გვაწყობდა, რადგან რეალური ფასის ცვლილება რომ დაგვჭირდებოდა, სტრინგზე არ იმუშავებდა
        const value = parseInt(priceInput.value);
        priceValue.textContent = `Value : $${value}`;
        let newStore = store.filter((product) => product.price / 100 <= value);
        display(newStore, getElement('.products-container'));


        if (newStore.length < 1) {
            const products = getElement('.products-container');
            products.innerHTML = `<h3 class="filter-error">
                sorry, no products matched your search
                </h3>`
        }
    });

}


export default setupPrice;