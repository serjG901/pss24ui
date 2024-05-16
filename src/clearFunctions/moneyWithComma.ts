export default function moneyWithComma(money: number) {
    const moneyStr = money + "";
    if (money >= 1000) {
        return moneyStr
            .split("")
            .reduce(
                (acc, item, i, arr) =>
                    (arr.length - i) % 3
                        ? acc + item
                        : i === 0
                        ? acc + item
                        : acc + "," + item,
                ""
            );
    }
    return moneyStr;
}
