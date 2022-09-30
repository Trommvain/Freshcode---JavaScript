class MyArray {
    constructor() {
        this.length = 0;
    }

    push(...elems) {
        for (let i = 0; i < elems.length; i++) {
        this[this.length++] = elems[i];
        }
        return this.length;
    }

    pop() {
        if (this.length === 0) {
            return undefined;
        }
        const elem = this[this.length -1];
        delete this[this.length-1];
        this.length--;
        return elem;
    }

    concat(...items) {
        const newArr = new MyArray();
        for (let i = 0; i < this.length; i++) {
            newArr.push(this[i]);
        }
        for (let i = 0; i < items.length; i++) {
            if (MyArray.isMyArray(items[i])) {
                for (let j = 0; j < items[i].length; j++) {
                    newArr.push(items[i][j]);
                }
            } else {
                newArr.push(items[i]);
            }
        }
        return newArr;
    }

    [Symbol.iterator] () {
        const context = this;
        let i = 0;
        return {
            next() {
                return {
                    done: i >= context.length,
                    value: context[i++],
                }
            },
        }
    }

    static isMyArray(obj) {
        return obj instanceof MyArray;
    }

//-------------------------NEW TASK-------------------------------//

    unshift(...items) {
      const len = items.length;
      //Последовательно, начиная с конца массива, смещаем данные на новые места вперед
      //Смещение равно длине массива новых данных (len)
      for (let i = this.length - 1; i >= 0; i--) {
        this[i + len] = this[i];
      }
      //Первые места исходного массива (количество которых равно len)
      //перезаписываем данными из массива новых данных
      for (let i = 0; i < len; i++) {
        this[i] = items[i];
      }
      //Увеличиваем длину исходного массива на длину массива новых данных
       return this.length += len;
    }

    shift() {
        if (this.length === 0) {
            return undefined;
        }

        const elem = this[0];
        //Смещаем все данные на один индекс назад.
        //Первое значение перезаписывается вторым и т.д.
        for (let i = 0; i < this.length; i++) {
            this[i] = this[i + 1];
        }
        //Удаляем последний элемент массива и уменьшаем длину
        delete this[--this.length];

        return elem;
    }

    forEach(callback) {
        if (typeof callback !== 'function') throw new Error('Argument must be a function');

        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    }

    map(callback) {
        if (typeof callback !== 'function') throw new Error('Argument must be a function');

        const newArray = new MyArray();

        for (let i = 0; i < this.length; i++) {
            newArray.push(callback(this[i], i, this));
        }

        return newArray;
    }

    filter(callback) {
        if (typeof callback !== 'function') throw new Error('Argument must be a function');

        const newArray = new MyArray();

        for (let i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) newArray.push(this[i]);
        }

        return newArray;
    }

    reverse() {
        if (this.length === 0) return;
        //Суть алгоритма - мы последовательно меняем местами значения с конца
        //на значения с начала (последнее c первым, предпоследнее со вторым и т.д.)
        //swapNumber - количество таких замен
        const swapNumber = Math.floor(this.length / 2);
        let i = 0;
        let j = this.length - 1;
        let temp;

        for (let swap = 0; swap <= swapNumber; swap++) {
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
            i++; j--;
        }
    }

//-------------------------------------------------------------------//

}

const arr1 = new MyArray();
arr1.push(1, 2, 3);
