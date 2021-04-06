exports.handler = async (event) => {
    let kanji = decodeURI(event.pathParameters.kanji);
    if (kanji == "漢字") {
        kanji = "壱千壱拾";
    }
    const kansuuji1 = new Set("零壱弐参四五六七八九拾百千");
    const kansuuji2 = new Set("零万億兆");
    const kans = "零壱弐参四五六七八九";
    const keta1 = "千百拾";
    const keta2 = "兆億万";
    let ans = "";

    function Kan2Num(str) {
        let tmp;
        for (let i = 0; i < kans.length; i++) {
            tmp = new RegExp(kans[i], "g");
            str = str.replace(tmp, i);
        }
        return str;
    }

    function Kan2NumCnv(str, n) {
        let ans = 0;
        let poss = 0;
        let pos;
        let block;
        let keta;
        let tmpstr;

        if (n === 1) {
            keta = keta1;
        } else {
            keta = keta2;
        }

        for (let i = 0; i < keta.length; i++) {
            pos = str.indexOf(keta[i]);
            if (pos === -1) {
                continue;
            } else if (pos === poss) {
                block = 1;
            } else {
                tmpstr = str.slice(poss, pos);
                if (n === 1) {
                    block = Number(Kan2Num(tmpstr));
                } else {
                    block = Kan2NumCnv(tmpstr, 1);
                }
            }
            ans += block * 10 ** (n * (keta.length - i));
            poss = pos + 1;
        }

        if (poss !== str.length) {
            tmpstr = str.slice(poss, str.length);
            if (n === 1) {
                ans += Number(Kan2Num(tmpstr));
            } else {
                ans += Kan2NumCnv(tmpstr, 1);
            }
        }
        return ans;
    }


    function TextKan2Num(text) {
        let tmpstr = "";
        for (let i = 0; i < text.length + 1; i++) {
            if (i !== text.length) {
                if (
                    kansuuji1.has(text[i]) ||
                    (tmpstr !== "" && kansuuji2.has(text[i]))
                ) {
                    tmpstr += text[i];
                } else {
                    ans = 'erorr';
                    break;
                }
            } else {
                if (tmpstr !== "") {
                    ans += Kan2NumCnv(tmpstr, 4);
                    tmpstr = "";
                }
            }
        }
        return ans;
    }
    let statusCode;
    let result;
    result = TextKan2Num(kanji);
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