import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
    // როცა რაღაც არ გამოდის კონსოლში, კარგი იქნება თუ შევამოწმებთ console.log-ით.
    const form = getElement('.input-form');
    const nameInput = getElement('.search-input');
    // ყველაფერს რასაც შევიტანთ input-ში, ანუ search-ში, გამოიტანს კონსოლში
    form.addEventListener('keyup', function () {
        const value = nameInput.value;
        if (value) {
            const newStore = store.filter((product) => {
                let { name } = product;
                name = name.toLowerCase();
                if (name.startsWith(value)) {
                    return product;
                }
            });
            display(newStore, getElement('.products-container'));
            
            // აქ ვეუბნებით, რომ როცა არცერთი პროდუქტი არ დაემთხვევა ჩვენს მიერ შეტანილი პროდუქტის სახელს, მაშინ გამოიტანოს გარკვეული მესიჯი.
            if (newStore.length < 1) {
                const products = getElement('.products-container');
                products.innerHTML = `<h3 class="filter-error">
                sorry, no products matched your search
                </h3>`
            }
        }
        else {
            display(store, getElement('.products-container'));
            // თუ input, anu search box ცარიელია, მაშინ გამოიტანოს ყველა ის პროდუქტი, რაც გვაქვს, ანუ თუ არ მივუთითეთ რაღაც სახელი ან უბრალოდ ასო, გარკვეული ავეჯის, გამოიტანოს ყველა არსებული მარაგში.
        }
    })
}

export default setupSearch;