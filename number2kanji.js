exports.handler = async (event) => {
    let number = event.pathParameters.number;
    const kans = "零壱弐参四五六七八九";
    let result;
    let statusCode;

    function Num2KanLttr(num) {
        let tmp;
        for (let i = 0; i < kans.length; i++) {
            if (Number(num) == i) {
                num = kans[i];
            }
        }
        return num;
    }

    function Num2Kan(num, n) {
        const keta = "兆億万";
        let kurai = 0;
        let ans;
        let str = "";
        let tmpstr;
        if (num == 0) {
            return "零";
        }
        for (let i = 0; i <= keta.length; i++) {
            kurai = 10 ** (n * (keta.length - i));
            if (num / kurai >= 1) {
                ans = Math.floor(num / kurai);
                tmpstr = N2K(ans, 1);
                if (keta.length - i != 0) {
                    tmpstr = tmpstr + keta[i];
                }
                num = num - ans * kurai;
                str += tmpstr;
            }
        }
        return str;
    }

    function N2K(num, n) {
        const keta = "千百拾";
        let kurai = 0;
        let ans;
        let tmpstr;
        let str = "";
        for (let i = 0; i <= keta.length; i++) {
            kurai = 10 ** (1 * (keta.length - i));
            if (num / kurai >= 1) {
                ans = Math.floor(num / kurai);
                if (keta.length - i != 0) {
                    tmpstr = Num2KanLttr(String(ans)) + keta[i];
                } else {
                    tmpstr = Num2KanLttr(String(ans));
                }
                num = num - ans * kurai;
                str += tmpstr;
            }
        }
        return str;
    }

    function Number2Kanji(input_num) {
        let ans;
        var pattern = /^[-]?([1-9]\d*|0)(\.\d+)?$/;
        if (pattern.test(input_num)) {
            ans = Num2Kan(input_num, 4);
            return ans;
        } else {
            ans = "erorr";
            return ans;
        }
    }

    result = Number2Kanji(number);
    if (result == 'erorr') {
        statusCode = 204;
    } else {
        statusCode = 200;
    };

    const response = {
        statusCode: statusCode,
        body: result,
    };
    return response;
};