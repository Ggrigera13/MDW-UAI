const age: number = 30;

const x = 30;
const y: number = 50;
const res = x + y;

// ----- Types -----
// Tiene 2 posibles valores
type ning = string | number;

// Tiene que cumplir ambas condiciones
type ning_2 = string & number;

const sample: ning = 50;
const sample2: ning = "Hola";

// ----- Interfaces -----
interface Person {
    age: number;
    name: string;
    birthdate: Date;
    isMarried: boolean;
}

// No podríamos dejar nada nulo porque es una interface
const personSample: Person = {
    age: 25,
    name: "Gianfranco",
    lastname: "Grigera",
    birthdate: new Date("2000-08-10"),
    isMarried: false,
};

type Person2 = {
    age: number;
    name: string;
    birthdate: Date;
    // Opcional "?"
    isMarried?: boolean; 
} | null;

// Aca si podríamos dejarlo nulo porque es un type
const personSample2: Person2 = null;

const personSample3: Person2 = {
    age: 25,
    name: "Gianfranco",
    birthdate: new Date("2000-08-10")
};

// Re-declaración de interfaces
interface Person {
    lastname: string;
}

// Re-declaración de types
type Person2Extended = Person2 & {
    lastname: string;
};

// Extensión de interfaces
interface Employee extends Person {
    salary: number;
}

const employeeSample: Employee = {
    age: 25,
    name: "Gianfranco",
    lastname: "Grigera",
    birthdate: new Date("2000-08-10"),
    isMarried: false,
    salary: 50000,
};

// Exclusión de propiedades en type
type PersonShort = Omit<Person2Extended, "age">;

// Exclusión de propiedades en interface
interface EmployeeShort extends Omit<Employee, "salary"> {};

// Hace que todas las propiedades sean opcionales
type PersonPartial = Partial<Person2>;

const personPartialSample: PersonPartial = {
    name: "Gianfranco"
}

// ----- ENUMS -----
enum UserRole {
    ADMIN = "Admin",
    CLIENT = "Client",
    SUPER_ADMIN = "SuperAdmin"
};

interface Client {
    userName: string;
    password: string;
    role: UserRole;
};

const clientSample: Client = {
    userName: "gianfranco",
    password: "123456",
    role: UserRole.CLIENT
};

// ----- Function Types -----
interface args {
    arg1?: string;
    arg2: number;
}

type MyFunction = (arg1: string | undefined, arg2: number) => string;

const functionSample: MyFunction = (name, age) => {
    return `Hola, mi nombre es ${name} y tengo ${age} años.`;
}

const functionSample2: MyFunction = (name = "Pablo", age) => {
    return `Hola, mi nombre es ${name} y tengo ${age} años.`;
}

type MyFunction2 = (args: args) => string;

const functionSample3: MyFunction2 = (args: args) => {
    const { arg1 = "Pablo", arg2 } = args;
    return `Hola, mi nombre es ${arg1} y tengo ${arg2} años.`;
}