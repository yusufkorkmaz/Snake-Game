const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    sutunSayisi = 11,
    satirSayisi = 11,
    kutuGenisligi = 35,
    kutuYuksekligi = 35,
    yatayKenarKalinligi = 1,
    dikeyKenarKalinligi = 1,
    satirlarinOrtasi = Math.floor(satirSayisi / 2),
    sutunlarinOrtasi = Math.floor(sutunSayisi / 2);

let gidilecekYonAdi = '',
    kuyrukKonumlari = [],
    yilaninBulunduguSatir = satirlarinOrtasi,
    yilaninBulunduguSutun = sutunlarinOrtasi,
    yemeginBulunduguSatir = Math.floor(Math.random() * satirSayisi),
    yemeginBulunduguSutun = Math.floor(Math.random() * sutunSayisi),
    toplamGenislik = (kutuGenisligi + dikeyKenarKalinligi) * sutunSayisi + dikeyKenarKalinligi,
    toplamYukseklik = (kutuYuksekligi + yatayKenarKalinligi) * satirSayisi + yatayKenarKalinligi;

canvas.width = toplamGenislik;
canvas.height = toplamYukseklik;
ctx.fillStyle = 'gray';

setInterval(gameLoop, 200);

function gameLoop() {
    yilaniCiz();
}

function yilaniCiz() {
    kutuRenklendir(yilaninBulunduguSatir, yilaninBulunduguSutun, 'white');
    gidilecekYonFonksiyonu();
    kuyrukKonumlari.shift();
    kuyrukKonumlari.unshift({satir: yilaninBulunduguSatir, sutun: yilaninBulunduguSutun});
    for (let i = 0; i < kuyrukKonumlari.length; i++) {
        kutuRenklendir(kuyrukKonumlari[i].satir, kuyrukKonumlari[i].sutun, 'black');
    }
}

function yatayCubuklariCiz() {
    for (let satirNo = 0; satirNo <= satirSayisi; satirNo++) {
        ctx.fillRect(0, yBul(satirNo), toplamGenislik, yatayKenarKalinligi);
    }
}

function dikeyCubuklariCiz() {
    for (let sutunNo = 0; sutunNo <= sutunSayisi; sutunNo++) {
        ctx.fillRect(xBul(sutunNo), 0, dikeyKenarKalinligi, toplamYukseklik)
    }
}

function koordinatBul(satirNo, sutunNo) {
    const x = xBul(sutunNo);
    const y = yBul(satirNo);
    return {x, y};
}

function kutuRenklendir(satir, sutun, renk) {
    const koordinatlar = koordinatBul(satir, sutun);

    previousStyle = ctx.fillStyle;
    ctx.fillStyle = renk;

    kutucukSolUstX = dikeyKenarKalinligi + koordinatlar.x;
    kutucukSolUstY = yatayKenarKalinligi + koordinatlar.y;

    ctx.fillRect(kutucukSolUstX, kutucukSolUstY, kutuGenisligi, kutuYuksekligi);
    ctx.fillStyle = previousStyle;
}

function xBul(sutunNo) {
    return sutunNo * (kutuGenisligi + dikeyKenarKalinligi);
}

function yBul(satirNo) {
    return satirNo * (kutuYuksekligi + yatayKenarKalinligi)
}

function yemekCiz() {
    kutuRenklendir(yemeginBulunduguSatir, yemeginBulunduguSutun, 'red');
}

function yilaniOrtala() {
    kuyrukKonumlari.unshift({satir: yilaninBulunduguSatir, sutun: yilaninBulunduguSutun});
}

yatayCubuklariCiz();
dikeyCubuklariCiz();
yilaniOrtala();
yemekCiz();
document.addEventListener('keyup', klavyeTuslarindanBirineBasildi);

function klavyeTuslarindanBirineBasildi(e) {

    switch (e.code) {
        case 'ArrowUp':
            if (gidilecekYonAdi !== 'down') {
                gidilecekYonAdi = 'up';
                gidilecekYonFonksiyonu = yukariCik;
            }
            break;
        case 'ArrowDown':
            if (gidilecekYonAdi !== 'up') {
                gidilecekYonAdi = 'down';
                gidilecekYonFonksiyonu = asagiIn;
            }
            break;
        case 'ArrowLeft':
            if (gidilecekYonAdi !== 'right') {
                gidilecekYonAdi = 'left';
                gidilecekYonFonksiyonu = solaGit;
            }
            break;
        case 'ArrowRight':
            if (gidilecekYonAdi !== 'left') {
                gidilecekYonAdi = 'right';

                gidilecekYonFonksiyonu = sagaGit;
            }
            break;
    }

}

function gidilecekYonFonksiyonu(){

}

function yukariCik() {
    yilaninBulunduguSatir--;
}

function asagiIn() {
    yilaninBulunduguSatir++;
}

function solaGit() {
    yilaninBulunduguSutun--;
}

function sagaGit() {
    yilaninBulunduguSutun++;
}