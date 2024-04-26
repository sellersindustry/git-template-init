

export class InternalError extends Error {
    constructor(message:string) {
        super(`Git Template Initializer - ${message}`);
        this.name = "Git Template Init Internal Error";
    }
}

