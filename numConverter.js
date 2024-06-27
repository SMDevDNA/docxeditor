export function convertToString(n){
    const result = [];
    let hugeN;
    let smallN;
    if(n > 999){
        hugeN = (n - n % 1000)/1000;

        if(hugeN % 10 == 1 && hugeN - 11 % 10 != 0){
            result.push(numConvert(hugeN, true));
            result.push("тисяча");
        }else{
            result.push(numConvert(hugeN, false));

            if(hugeN >= 5 && hugeN <= 20){
                result.push("тисяч");
            }else if(hugeN % 10 > 1 && hugeN % 10 < 5){
                result.push("тисячі");
            }else if(hugeN % 10 >= 5 || hugeN % 10 == 0){
                    result.push("тисяч");
            }

        }

        smallN = n % 1000;

        if(smallN % 10 == 1 && smallN - 11 % 10 != 0){
            result.push(numConvert(smallN, true));
            result.push("гривня");
        }else{
            result.push(numConvert(smallN, false));

            if(smallN >= 5 && smallN <= 20){
                result.push("гривень");
            }else if(smallN % 10 > 1 && smallN % 10 < 5){
                result.push("гривні");
            }else if(smallN % 10 >= 5 || smallN % 10 == 0){
                result.push("гривень");
            }

        }
    }
    result.push("нуль копійок")
    return result.join(' ');
};

export function numConvert(n, exep){
    if (Number.isNaN(n)) {
        return '?';
    }
    if (n === 0) {
        return 'ноль';
    }

    const result = [];

    const u = n % 10;
    const t = Math.floor(n % 100 / 10);
    const h = Math.floor(n / 100);

    if (h > 0) {
        result.push([
            undefined, 'сто', 'двісті' , 'триста', 'чотириста',
            'п\'ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев\'ятсот'
        ][h]);
    }

    if (t === 1) {
        result.push([
            'десять'      , 'одинадцять' ,
            'дванадцять'  , 'тринадцять'  ,
            'чотирнадцять', 'п\'ятнадцять'  ,
            'шістнадцять' , 'сімнадцять'  ,
            'вісімнадцять', 'дев\'ятнадцять'
        ][u]);
    } else {
        if (t > 1) {
            result.push([
                undefined    , undefined  ,
                'двадцать'   , 'тридцать' ,
                'сорок'      , 'пятьдесят',
                'шестьдесят' , 'семьдесят',
                'восемьдесят', 'девяносто'
            ][t]);
        }
        if (u > 1 && !exep) {
            result.push([
                undefined, 'один' , 'два' , 'три'   , 'чотири',
                'пять'   , 'шість', 'сім', 'вісім', 'дев\'ять'
            ][u]);
        } else if (u > 0 && exep){
            result.push([
                undefined, 'одна'][u]);
        }
    }

    return result.join(' ');
};