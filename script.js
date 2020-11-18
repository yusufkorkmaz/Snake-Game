const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    sutunSayisi = 11,
    satirSayisi = 11,
    kutuGenisligi = 30,
    kutuYuksekligi = 30,
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
    skor = 0,
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
    let kutucukSolUstX = dikeyKenarKalinligi + koordinatlar.x;
    let kutucukSolUstY = yatayKenarKalinligi + koordinatlar.y;

    ctx.fillRect(kutucukSolUstX, kutucukSolUstY, kutuGenisligi, kutuYuksekligi);
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

function gidilecekYon(){}

setInterval(gameLoop, 200);

function gameLoop() {
    pekmeninOncekiBulunduguSatir = pekmeninBulunduguSatir;
    pekmeninOncekiBulunduguSutun = pekmeninBulunduguSutun;
    gidilecekYon();
    pekmeniHareketEttir();
}

function klavyeTuslarindanBirineBasildi(e) {
    switch (e.code) {
        case 'ArrowUp':
            gidilecekYon = yukariCik;
            break;
        case 'ArrowDown':
            gidilecekYon = asagiIn;
            break;
        case 'ArrowLeft':
            gidilecekYon = solaGit;
            break;
        case 'ArrowRight':
            gidilecekYon = sagaGit;
            break;
    }
    pekmeniHareketEttir();
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

function pekmeniHareketEttir() {
    if (yemeginUstundeMi()) {
        yemegiYe();
    }
    oncekiPekmeniSil();
    pekmeniCiz();

    pekmenDuvariGectiMi();
}

function yemeginUstundeMi() {
    return yemeginBulunduguSatir === pekmeninBulunduguSatir && yemeginBulunduguSutun === pekmeninBulunduguSutun;
}

function yemegiYe() {
    yemekCiz();
    skor += 10;
    document.getElementById('skor').innerHTML = '' + skor;
}

function pekmenDuvariGectiMi() {
    if (pekmeninBulunduguSatir < 0 || pekmeninBulunduguSatir > satirSayisi - 1 || pekmeninBulunduguSutun < 0 || pekmeninBulunduguSutun > sutunSayisi - 1) {
        gidilecekYon = function (){};
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

yatayCubuklariCiz();
dikeyCubuklariCiz();
yemekCiz();
pekmeniOrtala();
document.getElementById('skor').innerHTML = '' + skor;
document.addEventListener('keydown', klavyeTuslarindanBirineBasildi);


/*
* X yönünde ilerliyorsa animasyon sadece X yönünde etki edecek
* Y yönünde ilerliyorsa animasyon sadece Y yönünde etki edecek
*/