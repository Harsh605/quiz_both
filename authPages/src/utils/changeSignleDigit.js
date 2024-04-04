export function modifyNumber(num) {
    if (num >= 0 && num <= 9) {
        return num;
    } else {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum <= 9 ? sum : modifyNumber(sum);
    }
}