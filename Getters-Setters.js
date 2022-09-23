// Реализовать класс RangeValidator. Обьекты, созданные им должны обладать следующими свойcтвами:
// from(число)
// to(число)

// Реализовать геттеры и сеттеры для обоих свойств.
// Реализовать getter range, который будет возвращать массив, состоящий из границ диапазона from и to.
// Реализовать метод validate, который будет принимать число и проверить входит ли число в указанный диапазон. Метод возвращает это же число, если оно входит в диапазон.
// И кинет ошибку, если не входит.


// Bonus tasks:
// Создать проверки которые убедятся, что число во from меньше числа to и наоборот.
// Создать проверки, которые помогут избежать попадание неправильных типов данных в from и to.

class RangeValidator {
    #from;
    #to;

    constructor(from, to) {
        this.#from = from;
        this.#to = to;
    }

    get getFrom() {
        return this.#from;
    }

    get getTo() {
        return this.#to;
    }

    set setFrom(value) {
        if (typeof value !== 'number') throw new Error('Value must be a number');
            else if (value > this.#to) throw new Error('\'From\' value must be less than \'to\' value');
                else this.#from = value;
    }

    set setTo(value) {
        if (typeof value !== 'number') throw new Error('Value must be a number');
            else if (value < this.#from) throw new Error('\'To\' value must be more than \'from\' value');
                else this.#to = value;
    }

    get range() {
        return [this.#from, this.#to];
    }

    validate(value) {
        if (value >= this.#from && value <= this.#to) return value;
            else throw new Error('Value don\'t match the range.');
    }
}

//Performance check

const myRange = new RangeValidator(0, 10);

console.log(myRange.getFrom);
console.log(myRange.getTo);
myRange.setFrom = 2;
myRange.setTo = 5;
console.log(myRange.getFrom);
console.log(myRange.getTo);
// myRange.setFrom = 5;
// myRange.setTo = 2;
console.log(myRange.range);
console.log(myRange.validate(4));
// console.log(myRange.validate(10));