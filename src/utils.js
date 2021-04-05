const allProductsUrl = 'https://course-api.com/javascript-store-products';

// temp single product
const singleProductUrl = 'https://course-api.com/javascript-store-single-product';

const getElement = (selection) => {
    const element = document.querySelector(selection);
    if (element) return element;
    throw new Error(
        `Please check "${selection}" selector, no such element exists`
    )
}


// ეს ფუნქცია უზრუნველყოფს იმას, რომ ის ფასი, რომელიც მოგვაქვს api-დან, მოგვაწოდოს როგორც მთელ რიცხვებად, ის გვაწოდებს მხოლოდ ცენტებად, ჩვენ კი გვჭირდება დოლარი და ცენტი, ორივე, ამიტომ ეს ფუნქცია სწორედ ამას უზრუნველყოფს რომ გამოიტანოს რეალური ფასი.
const formatPrice = (price) => {
    let formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format((price / 100).toFixed(2));
    return formattedPrice;
}
const getStorageItem = (item) => {
    let storageItem = localStorage.getItem(item);
    if (storageItem) {
        storageItem = JSON.parse(localStorage.getItem(item));
    }
    else {
        storageItem = [];   
    }
    return storageItem;
}

const setStorageItem = (name, item) => {
    // data-ს ვინახავთ local storage-ში
    localStorage.setItem(name, JSON.stringify(item));
}


export {
    allProductsUrl,
    singleProductUrl,
    getElement,
    formatPrice,
    getStorageItem,
    setStorageItem,
}