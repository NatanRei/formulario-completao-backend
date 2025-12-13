export class EmployeeAlreadyExistsError extends Error {
    constructor() {
        super('Funcionário já existe.')
    }
}