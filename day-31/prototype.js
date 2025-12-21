/**
 * JAVASCRIPT PROTOTYPES - DEEP DIVE
 * =================================
 * 
 * In JavaScript, objects have a special hidden property [[Prototype]] (exposed as __proto__ in browsers),
 * which is either null or references another object. That object is called "a prototype".
 * 
 * When we read a property from object, if it's missing, JavaScript automatically takes it 
 * from the prototype. This is called "prototypal inheritance".
 */

// ==========================================
// 1. THE BASICS: Object Literals & __proto__
// ==========================================
console.log("\n--- 1. BASIC PROTOTYPE CHAIN ---");

const animal = {
    eats: true,
    walk() {
        console.log("Animal walk");
    }
};

const rabbit = {
    jumps: true
};

// Set rabbit's prototype to be animal
rabbit.__proto__ = animal; // OLD WAY (for demonstration), modern way is Object.setPrototypeOf or Object.create

// rabbit can now use properties from animal
console.log("Rabbit eats?", rabbit.eats); // true (inherited)
console.log("Rabbit jumps?", rabbit.jumps); // true (own property)
rabbit.walk(); // "Animal walk" (inherited)

// The chain: rabbit -> animal -> Object.prototype -> null


// ==========================================
// 2. CONSTRUCTOR FUNCTIONS (Pre-ES6 Classes)
// ==========================================
console.log("\n--- 2. CONSTRUCTOR FUNCTIONS ---");

// A classic "class" definition in JS
function User(name) {
    this.name = name;
}

// Properties added to User.prototype are available to all instances
User.prototype.sayHi = function () {
    console.log(`Hi, I am ${this.name}`);
};

const user1 = new User("Alice");
const user2 = new User("Bob");

user1.sayHi(); // Hi, I am Alice
user2.sayHi(); // Hi, I am Bob

// Check the relationship
// user1.__proto__ === User.prototype
console.log("user1.__proto__ === User.prototype?", user1.__proto__ === User.prototype); // true
console.log("User.prototype.constructor === User?", User.prototype.constructor === User); // true


// ==========================================
// 3. PURE PROTOTYPAL INHERITANCE (Object.create)
// ==========================================
console.log("\n--- 3. Object.create (Pure Inheritance) ---");

const carPrototype = {
    wheels: 4,
    startEngine() {
        console.log("Vroom!");
    }
};

// Create a new object with `carPrototype` as its prototype
const myCar = Object.create(carPrototype);
myCar.brand = "Tesla";

console.log(`My ${myCar.brand} has ${myCar.wheels} wheels.`); // 4 inherited
myCar.startEngine();

// true prototypal inheritance without constructor functions!


// ==========================================
// 4. DEEP DIVE: MODIFICATION VS ACCESS
// ==========================================
console.log("\n--- 4. MODIFICATION VS ACCESS ---");

const admin = {
    __proto__: user1, // admin inherits from user1 (Alice)
    isAdmin: true
};

// Reading property walks up the chain
console.log("Admin name (inherited):", admin.name); // Alice

// Writing property always stays on the object itself
admin.name = "Admin User"; // This creates a NEW property on admin, doesn't change user1
console.log("Admin name (own):", admin.name); // Admin User
console.log("User1 name (unchanged):", user1.name); // Alice


// ==========================================
// 5. MODERN CLASSES (Syntactical Sugar)
// ==========================================
console.log("\n--- 5. ES6 CLASSES & PROTOTYPES ---");

class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(`${this.name} says Woof!`);
    }
}

const myDog = new Dog("Buddy");
myDog.bark();

// Proof that class is just a function and uses prototypes
console.log("typeof Dog:", typeof Dog); // "function"
console.log("myDog.__proto__ === Dog.prototype:", myDog.__proto__ === Dog.prototype); // true
console.log("Dog.prototype includes bark:", transformToHasOwnProperty(Dog.prototype, 'bark'));

function transformToHasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

// ==========================================
// 6. HELPER: VISUALIZING THE CHAIN
// ==========================================
console.log("\n--- 6. VISUALIZE CHAIN ---");

function tracePrototypeChain(obj) {
    let proto = obj;
    let chain = [];
    while (proto) {
        // Try to get a name for the prototype
        let name = proto.constructor ? proto.constructor.name : 'Null/Object';
        if (proto === Object.prototype) name = "Object.prototype";
        chain.push(name);
        proto = Object.getPrototypeOf(proto);
    }
    chain.push("null");
    console.log(chain.join(" -> "));
}

console.log("Chain for myDog:");
tracePrototypeChain(myDog); // Dog -> Object -> Object.prototype -> null

console.log("Chain for rabbit:");
tracePrototypeChain(rabbit); // Object -> Object -> Object.prototype -> null
