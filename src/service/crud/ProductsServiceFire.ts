import { Observable, catchError, of } from "rxjs";
import {
    CollectionReference, DocumentReference, getFirestore,
    collection, getDoc, FirestoreError, setDoc, deleteDoc, doc, getDocs
} from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore'
import { getRandomInt } from "../../util/random";
import { Product } from "../../model/Product";
import ProductsService from "./ProductsService";
import appFirebase from "../../config/firebase-config";

import productsConfig from "../../config/products-config.json"
const initialProducts = productsConfig.initialProducts

const MIN_ID = 100000;
const MAX_ID = 1000000;

function convertProduct(product: Product, id?: string): any {
    const res: any = {
        ...product,
        id: id ? id : product.id,
        price: `$${product.price}`
    }
    return res;
}
function getErrorMessage(firestoreError: FirestoreError): string {
    let errorMessage = '';
    switch (firestoreError.code) {
        case "unauthenticated":
        case "permission-denied": errorMessage = "Authentication"; break;
        default: errorMessage = firestoreError.message;
    }
    return errorMessage;
}

export default class ProductsServiceFire implements ProductsService {

    collectionRef: CollectionReference = collection(getFirestore(appFirebase), 'products');

    constructor() {
        this.initProductsCollection()
    }
    private async initProductsCollection() {
        const snapshot = await getDocs(this.collectionRef);
        snapshot.empty ? console.log('empty') : console.log('no');
        if (snapshot.empty) {
            initialProducts.forEach(p => this.addProduct(p))
        }
    }

    async addProduct(prod: Product): Promise<Product> {
        const id: string = await this.getId();
        const product = convertProduct(prod, id);
        const docRef = this.getDocRef(id);
        try {
            await setDoc(docRef, product)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return product;
    }
    private getDocRef(id: string): DocumentReference {
        return doc(this.collectionRef, id);
    }
    private async exists(id: string): Promise<boolean> {
        const docRef: DocumentReference = this.getDocRef(id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }
    private async getId(): Promise<string> {
        let id: string = '';
        do {
            id = getRandomInt(MIN_ID, MAX_ID).toString();
        } while (await this.exists(id));
        return id;
    }
    getProducts(): Observable<string | Product[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestorError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestorError);
            return of(errorMessage) //of закидывает мессадж в стрим
        })) as Observable<string | Product[]>
    }
    async deleteProduct(id: any): Promise<void> {
        const docRef = this.getDocRef(id);
        if (!await this.exists(id)) {
            throw 'not found';
        }
        try {
            await deleteDoc(docRef);
        } catch (error: any) {
            const firestorError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestorError);
            throw errorMessage;
        }
    }
    async updateProduct(prod: Product): Promise<Product> {
        if (!prod.id || !await this.exists(prod.id)) {
            throw 'not found';
        }
        const product = convertProduct(prod);
        const docRef = this.getDocRef(prod.id);
        try {
            await setDoc(docRef, product)
        } catch (error: any) {
            const firestorError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestorError);
            throw errorMessage;
        }
        return product;
    }

}