import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
    // აქ კვადრატულ ფრჩხილებში გვაქვს, რადგან მანამდე გვქონდა როგორც ობიექტი, ახლა გვაქვს მასივი, Set-კი რას აკეთებს, გვიჩვენებს unique ელემენტებს, ანუ set-ის გარეშე მივიღებდით იგივე ელემენტებს ოღონდ დიდი რაოდენობით ანუ განმეორებით. 
    // all - დავამატეთ იმისთვის, რომ მასზე დაქლიქების შემთხვევაში გამოგვიტანოს ყველა პროდუქტი.
    let companies = ['all', ...new Set(store.map((product) => product.company))];
    const companiesDOM = getElement('.companies');
    companiesDOM.innerHTML = companies.map((company) => {
        return `<button class="company-btn">${company}</button>`
    }).join('');
    companiesDOM.addEventListener('click', function (e) {
        // აქ ვუთხარით, რომ, როცა დავაქლიქებთ all-ზე, e.target-დავწერეთ რადგან პირდაპირ დაქლიქებისას მის კლასს ვწვდებით, ამიტომ parentElement არ გვჭირდება, თუ დავაქლიქებთ მოკლედ, შექმნას მასივი - newStore, რომელშიც ჩაყრის ყველა იმ ელემენტს, რომელიც გამოვა all-ღილაკზე დაქლიქებისას.
        const element = e.target;
        if (element.classList.contains('company-btn')) {
            let newStore = [];
            if (element.textContent === 'all') {
                newStore = [...store];
            }
            else {
                // თუ all არ იქნება, მაშინ გამოიტანოს ის პროდუქტები, რომლებიც დაემთხვევა კომპანიების სახელებს
                newStore = store.filter((product)=> product.company === e.target.textContent)
            }
            display(newStore, getElement('.products-container'));
        }
    })
};

export default setupCompanies;