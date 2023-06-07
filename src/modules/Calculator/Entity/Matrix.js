export default class Matrix{
    constructor(values){
        this.values=[];
        values.forEach((arr, i) => {
            this.values[i] = [];
            arr.forEach(elem => {
                this.values[i].push(elem);
            });
        });
}

    toString(){ 
        console.log(this.values);
        return `[${this.values.map( arr => arr.map(elem => elem.toString()).join(",")).join(';\n')}]`}

}