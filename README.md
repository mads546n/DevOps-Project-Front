Download libs:
npm i framer-motion
npm i @tanstack/react-query zod
npm i @tanstack/react-query-persist-client
npm i @tanstack/query-sync-storage-persister

Tilgå adminpanel: localhost/admin (ingen links, hvilket der heller ikke skal være)
kode: 1234


Use of typescript: 

Short about typescript:
TypeScript is JavaScript with type checking. 
It helps catch errors before you run the code — while coding or building.

Its only function is to help you with type checking. (it is run before the compiler and has no effect on the output).
You have to specify the type of the variable that you are creating. 

Instead of .jsx files use .tsx files. (then typescript will be able to check the types).

How to:
When creating variables such as 'title', you just have to give it a type.

// Variable
const title: string = "Mona Lisa";
const price: number = 1200;

or 

// Function parameters
function printInfo(title: string, price: number): void {
console.log("${title}: ${price}");
}

// Destructuring in React component
function AuctionItem({ title, price }: { title: string; price: number }) {
...
}

The types available are:
string, number, boolean, void, null, object, any, undefined, never.
(any, undefined, never are not recommended). They are used for special cases. And basically overwrites the type checker.

Sometimes you have to say that the object is either or, like is 'union type':

let value: string | number;
value = "hello";
value = 42; // both allowed


_____________________STYLES______________________
Added global styles
