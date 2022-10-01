// Даны несколько обьектов клиентов банка со следующими данными
// fullName - ФИО клента
// clientLevel - уровень договора с банком от которого зависят тарифы на определенные услуги
// Также есть обьект банка содержащий следующие данные:
// bankName - название банка
// clientLevels - обьекты со свойствами, являющимися уровнями договора с банком (например basic, pro, platinum, ...). 
// Каждый уровень договора содержит внутри себя свойство discount которое хранит размер скидки в процентах
// clientLevel должен быть связан с обьектом уровня договора через Map
// Реализовать функцию расчета стоимости покупки пользователем торвара, которая принимает пользователя и цену товара и возвращает стоимость товара с учетом скидки.
// Скидку доставать из хранящихся в мапе данных
// В случае если в мапе с уровнем клиента нет своязанного уровня в банке (например там решили убрать этот уровень договора) то можно считать что скидки нет

// Bonus tasks:
// У обьектов клиентов должно быть свойство, показывающее деньги на их счету
// При покупке количество денег на счету должно уменьшится на сумму покупки со скидкой
// При попытке купить товар, на который у пользователя не хватит денег ему должно выкидывать ошибку, в которой указано сколько ему не хватает денег до покупки

const client1 = {
    fullName: 'Sergey',
    clientLevel: 'platinum',
    account: 1000
}

const client2 = {
    fullName: 'Timofei',
    clientLevel: 'basic',
    account: 100
}

const client3 = {
    fullName: 'Igor',
    clientLevel: 'pro',
    account: 500
}

const client4 = {
    fullName: 'Parahmei',
    clientLevel: 'gold',
    account: 1000000
}

const bank = {
    bankName: 'Super Bank',
    clientLevels: {
        basic: {
            discount: 0
        },

        pro: {
            discount: 10
        },

        platinum: {
            discount: 30
        },

        gold: {
            discount: 75
        }
    }
}

const clientBankDiscountMap = new Map ([
    [client1.clientLevel, bank.clientLevels[client1.clientLevel]],
    [client2.clientLevel, bank.clientLevels[client2.clientLevel]],
    [client3.clientLevel, bank.clientLevels[client3.clientLevel]],
    [client4.clientLevel, bank.clientLevels[client4.clientLevel]],
]);

function calculatePrice (user, price) {
    if (!clientBankDiscountMap.get(user.clientLevel)) return price; //если убрали уровень договора из банка скидки нет
    return price -= price * (clientBankDiscountMap.get(user.clientLevel).discount / 100);
}

function buyProduct(user, productPrice) {
    const price = calculatePrice(user, productPrice);
    const discount = clientBankDiscountMap.get(user.clientLevel) ? clientBankDiscountMap.get(user.clientLevel).discount : 0; //для правильного вывада скидки в return'е
    if (user.account >= price) {
        user.account -= price;
        return `${user.fullName} have bought product for ${price}$ with ${discount}% '${bank.bankName}' discount`;
    }
    throw new Error (`${user.fullName} is lack ${price - user.account}$ to buy the product`);
}
