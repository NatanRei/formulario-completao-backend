export class EmployeeAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists.')
    }
}