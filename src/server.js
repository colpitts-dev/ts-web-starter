"use strict";

/**
 * Example Class
 */
class Person {
  constructor(name) {
    this.name = name;
  }

  talk(msg) {
    console.log(`[${this.name}]: ${msg}`);
  }
}

/**
 * Demo Application
 */
var person = new Person("Test");
typeof person.name === "string";

person.talk("Hello JavaScript!");
