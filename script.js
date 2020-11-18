const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    sutunSayisi = 11,
    satirSayisi = 11,
    kutuGenisligi = 35,
    kutuYuksekligi = 35,
    yatayKenarKalinligi = 1,
    dikeyKenarKalinligi = 1;

let toplamGenislik = (kutuGenisligi + dikeyKenarKalinligi) * sutunSayisi + dikeyKenarKalinligi,
    toplamYukseklik = (kutuYuksekligi + yatayKenarKalinligi) * satirSayisi + yatayKenarKalinligi,
    pekmeninBulunduguSatir = Math.floor(satirSayisi / 2),
    pekmeninBulunduguSutun = Math.floor(sutunSayisi / 2),
    pekmeninOncekiBulunduguSatir = 0,
    pekmeninOncekiBulunduguSutun = 0,
    yemeginBulunduguSatir = 0,
    yemeginBulunduguSutun = 0,
    yemeginBulunduguOncekiSatir = 0,
    yemeginBulunduguOncekiSutun = 0,
    kutucukSolUstX,
    kutucukSolUstY,
    skor = 0,
    gidilecekYonAdi = '',
    gozBuyuklugu = kutuGenisligi / 4,
    kuyruklar = [],
    previousStyle = '';

canvas.width = toplamGenislik;
canvas.height = toplamYukseklik;
ctx.fillStyle = 'gray';

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

function xBul(sutunNo) {
    return sutunNo * (kutuGenisligi + dikeyKenarKalinligi);
}

function yBul(satirNo) {
    return satirNo * (kutuYuksekligi + yatayKenarKalinligi)
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

function pekmeninGozleriniCiz(gidilecekYonAdi) {
    previousStyle = ctx.fillStyle;
    ctx.fillStyle = 'white';
    let sagGozX = kutucukSolUstX + (kutuGenisligi / 2) + (kutuGenisligi / 10);
    let solGozX = kutucukSolUstX + (kutuGenisligi / 10);
    let yukaridakiGozlerY = kutucukSolUstY + (kutuYuksekligi / 10);
    let asagidakiGozlerY = kutucukSolUstY - (kutuYuksekligi / 2) + kutuYuksekligi;

    switch (gidilecekYonAdi) {
        case "up":
            ctx.fillRect(solGozX, yukaridakiGozlerY, gozBuyuklugu, gozBuyuklugu);
            ctx.fillRect(sagGozX, yukaridakiGozlerY, gozBuyuklugu, gozBuyuklugu);
            break;
        case "down":
            ctx.fillRect(solGozX, asagidakiGozlerY, gozBuyuklugu, gozBuyuklugu);
            ctx.fillRect(sagGozX, asagidakiGozlerY, gozBuyuklugu, gozBuyuklugu);
            break;
        case "left":
            ctx.fillRect(solGozX, yukaridakiGozlerY, gozBuyuklugu, gozBuyuklugu);
            break;
        case "right":
            ctx.fillRect(sagGozX, yukaridakiGozlerY, gozBuyuklugu, gozBuyuklugu);
            break;
    }
    ctx.fillStyle = previousStyle;
}

function yemekCiz() {
    yemeginBulunduguSatir = Math.floor(Math.random() * sutunSayisi);
    yemeginBulunduguSutun = Math.floor(Math.random() * satirSayisi);
    kutuRenklendir(yemeginBulunduguSatir, yemeginBulunduguSutun, 'red');
}

function pekmenDuvariGecerseYemegiSil() {
    yemeginBulunduguOncekiSatir = yemeginBulunduguSatir;
    yemeginBulunduguOncekiSutun = yemeginBulunduguSutun;
    kutuRenklendir(yemeginBulunduguOncekiSatir, yemeginBulunduguOncekiSutun, 'white');
}

function pekmeniOrtala() {
    pekmeninBulunduguSatir = Math.floor(satirSayisi / 2);
    pekmeninBulunduguSutun = Math.floor(sutunSayisi / 2);
    pekmeniCiz();
}

setInterval(gameLoop, 200);

function gidilecekYonFonksiyonu() {
}

function gameLoop() {
    pekmeninOncekiBulunduguSatir = pekmeninBulunduguSatir;
    pekmeninOncekiBulunduguSutun = pekmeninBulunduguSutun;
    gidilecekYonFonksiyonu();
    pekmeniHareketEttir(gidilecekYonAdi);
    kuyruklariHareketEttir();

}

function klavyeTuslarindanBirineBasildi(e) {
    switch (e.code) {
        case 'ArrowUp':
            gidilecekYonFonksiyonu = yukariCik;
            gidilecekYonAdi = 'up';
            break;
        case 'ArrowDown':
            gidilecekYonFonksiyonu = asagiIn;
            gidilecekYonAdi = 'down';
            break;
        case 'ArrowLeft':
            gidilecekYonFonksiyonu = solaGit;
            gidilecekYonAdi = 'left';
            break;
        case 'ArrowRight':
            gidilecekYonFonksiyonu = sagaGit;
            gidilecekYonAdi = 'right';
            break;
    }
}

function yukariCik() {
    pekmeninBulunduguSatir--;
}

function asagiIn() {
    pekmeninBulunduguSatir++;
}

function solaGit() {
    pekmeninBulunduguSutun--;
}

function sagaGit() {
    pekmeninBulunduguSutun++;
}

function pekmeniHareketEttir(gidilecekYonAdi) {


    oncekiPekmeniSil();
    pekmeniCiz();
    pekmeninGozleriniCiz(gidilecekYonAdi);

    pekmenDuvariGectiMi();

    if (yemeginUstundeMi()) {
        yemegiYe();
    }

}
function kuyruklariHareketEttir(){

}
function yemeginUstundeMi() {
    return yemeginBulunduguSatir === pekmeninBulunduguSatir && yemeginBulunduguSutun === pekmeninBulunduguSutun;
}

function yemegiYe() {
    yemekCiz();
    kuyrukEkle();
    kuyrukCiz();
    skor += 10;
    document.getElementById('skor').innerHTML = '' + skor;
}

function pekmenDuvariGectiMi() {
    if (pekmeninBulunduguSatir < 0 || pekmeninBulunduguSatir > satirSayisi - 1 || pekmeninBulunduguSutun < 0 || pekmeninBulunduguSutun > sutunSayisi - 1) {
        kuyruklar.splice(0, kuyruklar.length);
        gidilecekYonFonksiyonu = function () {
        };
        skor = 0;
        document.getElementById('skor').innerHTML = '' + skor;
        pekmenDuvariGecerseYemegiSil();
        pekmeniOrtala();
        yemekCiz();
    }
}

function oncekiPekmeniSil() {
    kutuRenklendir(pekmeninOncekiBulunduguSatir, pekmeninOncekiBulunduguSutun, 'white');
}

function pekmeniCiz() {
    kutuRenklendir(pekmeninBulunduguSatir, pekmeninBulunduguSutun, 'black');
}

function kuyrukEkle() {
    switch (gidilecekYonAdi){
        case "up":
            kuyruklar.push({satir: pekmeninBulunduguSatir+kuyruklar.length, sutun: pekmeninBulunduguSutun});
            break;
        case "down":
            kuyruklar.push({satir: pekmeninBulunduguSatir-kuyruklar.length, sutun:pekmeninBulunduguSutun});
            break;
        case "left":
            kuyruklar.push({satir: pekmeninBulunduguSatir, sutun: pekmeninBulunduguSutun+kuyruklar.length});
            break;
        case "right":
            kuyruklar.push({satir: pekmeninBulunduguSatir, sutun: pekmeninBulunduguSutun-kuyruklar.length});
            break;
    }

    console.log(kuyruklar.length)
}
function kuyrukCiz(){
    kutuRenklendir(kuyruklar[kuyruklar.length-1].satir,kuyruklar[kuyruklar.length-1].sutun,'black');

}

yatayCubuklariCiz();
dikeyCubuklariCiz();
yemekCiz();
pekmeniOrtala();
document.getElementById('skor').innerHTML = '' + skor;
document.addEventListener('keydown', klavyeTuslarindanBirineBasildi);