interface IPerson {
  name: string
  age: number
  email: string
}

/**
 * Example Class
 */
class Person implements IPerson {
  name: string
  age: number
  email: string
  constructor(name: string, age: number, email: string) {
    this.name = name
    this.age = age
    this.email = email
  }

  talk(msg: string) {
    console.log(`[${this.name}]: ${msg}`)
  }
}

/**
 * Demo Application
 */
const newMember = new Person('Billy', 32, 'bill@example.com')

console.log('')
console.log(`Welcome to hyper[local] backend server`)
console.log(`Members must be 18 years or older.\n`)

console.log('New applicant is ', newMember)

if (newMember.age >= 18) {
  console.log(
    `+ ${newMember.name} is ${newMember.age}, please introduce yourself\n\n`,
  )
  newMember.talk('Hello everyone, super stoked to learn TypeScript\n\n')
  process.exit
} else {
  console.log(`${newMember.name} is a minor. Rejecting membership...\n\n`)
  process.exit(1)
}
