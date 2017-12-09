export interface PostProperties {
    index: number;
    name: string;
    email: string;
    date: Date;
    id?: string;
    body: string;
}

export class Post implements PostProperties {
    readonly index: number;
    readonly name: string;
    readonly email: string;
    readonly date: Date;
    readonly id?: string;
    readonly body: string;

    constructor({index, name, email, date, id, body}: PostProperties) {
        this.index = index;
        this.name = name;
        this.email = email;
        this.date = date;
        this.id = id;
        this.body = body;
    }
}
