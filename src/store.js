import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');
const setupStore = (products) => {
    store = products.map((product) => {
        const { id, fields: { featured, name, price, company, colors, image: img },  } = product;
        const image = img[0].thumbnails.large.url
        return { id, featured, name, price, company, colors, image };
    });
    // setStorageItem - ამის საშუალებით local storage-ში ინახება ჩვენი data.
    setStorageItem('store', store);
}
// console.log(store);
const findProduct = (id) => {
    // აქ ვეუბნებით, რომ წამოიღოს ის კონკრეტული პროდუქტი id-ს დახმარებით.
    let product = store.find((product) => product.id === id);
    // და დაგვიბრუნოს 
    return product;
}

// აქ რაც გვიწერია შემოკლებულად, იგივეა, რაც
// export let store;
// export const setupStore;
// export const findProduct;
export { store, setupStore, findProduct };