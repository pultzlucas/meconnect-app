function formatNum(f1, f, s, t, n) {
    const n10 = n % 10;
    let str = t;

    if (n === 1) {
        str = f1;
    } else if (n10 === 1 && n > 20) {
        str = f;
    } else if (n10 > 1 && n10 < 5 && (n > 20 || n < 10)) {
        str = s;
    }

    return str;
}
const seconds = formatNum.bind(null, 'секунду', '%s секунду', '%s секунды', '%s секунд'),
    minutes = formatNum.bind(null, 'минуту', '%s минуту', '%s минуты', '%s минут'),
    hours = formatNum.bind(null, 'час', '%s час', '%s часа', '%s часов'),
    days = formatNum.bind(null, 'день', '%s день', '%s дня', '%s дней'),
    weeks = formatNum.bind(null, 'неделю', '%s неделю', '%s недели', '%s недель'),
    months = formatNum.bind(null, 'месяц', '%s месяц', '%s месяца', '%s месяцев'),
    years = formatNum.bind(null, 'год', '%s год', '%s года', '%s лет');

export default function (number, index, totalSec) {
    // number: the time ago / time in number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
        ['только что', 'через несколько секунд'],
        [seconds(number) + ' назад', 'через ' + seconds(number)],
        [minutes(number) + ' назад', 'через ' + minutes(number)],
        [minutes(number) + ' назад', 'через ' + minutes(number)],
        [hours(number) + ' назад', 'через ' + hours(number)],
        [hours(number) + ' назад', 'через ' + hours(number)],
        ['вчера', 'завтра'],
        [days(number) + ' назад', 'через ' + days(number)],
        [weeks(number) + ' назад', 'через ' + weeks(number)],
        [weeks(number) + ' назад', 'через ' + weeks(number)],
        [months(number) + ' назад', 'через ' + months(number)],
        [months(number) + ' назад', 'через ' + months(number)],
        [years(number) + ' назад', 'через ' + years(number)],
        [years(number) + ' назад', 'через ' + years(number)],
    ][index];
};

// ['agora mesmo', 'agora'],
//     ['há %s segundos', 'em %s segundos'],
//     ['há um minuto', 'em um minuto'],
//     ['há %s minutos', 'em %s minutos'],
//     ['há uma hora', 'em uma hora'],
//     ['há %s horas', 'em %s horas'],
//     ['há um dia', 'em um dia'],
//     ['há %s dias', 'em %s dias'],
//     ['há uma semana', 'em uma semana'],
//     ['há %s semanas', 'em %s semanas'],
//     ['há um mês', 'em um mês'],
//     ['há %s meses', 'em %s meses'],
//     ['há um ano', 'em um ano'],
//     ['há %s anos', 'em %s anos'],