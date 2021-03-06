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

let hiz = 200,
    score = 0,
    gidilecekYonAdi = '',
    kuyrukKonumlari = [],
    kuyrugunBulunmadigiKonumlar = [],
    yilaninKafasininBulunduguSatir = satirlarinOrtasi,
    yilaninKafasininBulunduguSutun = sutunlarinOrtasi,
    yemeginBulunduguOncekiSatir = 0,
    yemeginBulunduguOncekiSutun = 0,
    yemeginBulunduguSatir = 0,
    yemeginBulunduguSutun = 0,
    toplamGenislik = (kutuGenisligi + dikeyKenarKalinligi) * sutunSayisi + dikeyKenarKalinligi,
    toplamYukseklik = (kutuYuksekligi + yatayKenarKalinligi) * satirSayisi + yatayKenarKalinligi,
    previousStyle = '',
    kutucukSolUstX = 0,
    kutucukSolUstY = 0,
    baslangictaEklenecekKuyrukSayisi = 2;

canvas.width = toplamGenislik;
canvas.height = toplamYukseklik;
ctx.fillStyle = 'gray';

let timer = setInterval(gameLoop, hiz);

function hizArtir() {
    clearInterval(timer);
    timer = setInterval(gameLoop, hiz - 55);
}

function hiziNormalYap() {
    clearInterval(timer);
    timer = setInterval(gameLoop, 250);
}

function gameLoop() {
    yilaniCiz();
}

function yilaniCiz() {
    if (yilanDuvaraDegdiMiKontrolEt()) {
        oyunuSifirla();
    } else if (yilanKendineDegdiMiKontrolEt()) {
        oyunuSifirla();
    } else {
        kutuRenklendir(yilaninKafasininBulunduguSatir, yilaninKafasininBulunduguSutun, 'white');

        gidilecekYonFonksiyonu();
        if (!yemekleAyniKonumdaMi()) {
            if (baslangictaEklenecekKuyrukSayisi > 3) {
                kutuRenklendir(kuyrukKonumlari[kuyrukKonumlari.length - 1].satir, kuyrukKonumlari[kuyrukKonumlari.length - 1].sutun, 'white');
                kuyrukKonumlari.pop();
            } else {
                if (baslangictaEklenecekKuyrukSayisi <= 3) {
                    baslangictaEklenecekKuyrukSayisi++;
                }
            }
        } else {
            hizArtir();
            skorArtir();
            yemekCiz();
        }
        kuyrukKonumlari.unshift({satir: yilaninKafasininBulunduguSatir, sutun: yilaninKafasininBulunduguSutun});

        // ilk kutuya göz çizdirmek için bu işlemi yaptım
        kutuRenklendir(kuyrukKonumlari[0].satir, kuyrukKonumlari[0].sutun, 'black');
        gozCiz();
        for (let i = 1; i < kuyrukKonumlari.length; i++) {
            kutuRenklendir(kuyrukKonumlari[i].satir, kuyrukKonumlari[i].sutun, 'black');
        }
    }
}


function gozCiz() {
    ctx.fillStyle = 'white';
    let sagGozX = kutucukSolUstX + (kutuGenisligi / 2) + (kutuGenisligi / 10);
    let solGozX = kutucukSolUstX + (kutuGenisligi / 10);
    let yukaridakiGozlerY = kutucukSolUstY + (kutuYuksekligi / 10);
    let asagidakiGozlerY = kutucukSolUstY - (kutuYuksekligi / 2) + kutuYuksekligi;
    let gozBuyuklugu = kutuGenisligi / 4;

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
}

function oyunuSifirla() {
    baslangictaEklenecekKuyrukSayisi = 2;
    hiziNormalYap();
    for (let i = 0; i < kuyrukKonumlari.length; i++) {
        kutuRenklendir(kuyrukKonumlari[i].satir, kuyrukKonumlari[i].sutun, 'white');
    }
    oncekiYemegiSil();
    yemekCiz();
    kuyrukKonumlari.splice(0, kuyrukKonumlari.length);
    yilaninKafasininBulunduguSatir = satirlarinOrtasi;
    yilaninKafasininBulunduguSutun = sutunlarinOrtasi;
    kuyrukKonumlari.unshift({satir: yilaninKafasininBulunduguSatir, sutun: yilaninKafasininBulunduguSutun});
    gidilecekYonFonksiyonu = empty;
    gidilecekYonAdi = '';
    skorSifirla();

}

function empty() {

}

function yilanDuvaraDegdiMiKontrolEt() {
    switch (gidilecekYonAdi) {
        case 'up':
            if (yilaninKafasininBulunduguSatir === 0) {
                return true;
            }
            break;
        case 'down':
            if (yilaninKafasininBulunduguSatir === satirSayisi - 1) {
                return true;
            }
            break;
        case 'left':
            if (yilaninKafasininBulunduguSutun === 0) {
                return true;
            }
            break;
        case 'right':
            if (yilaninKafasininBulunduguSutun === sutunSayisi - 1) {
                return true;
            }
            break;
    }
}

function yilanKendineDegdiMiKontrolEt() {
    let yilanKendineDokundu = false;
    for (let i = 1; i < kuyrukKonumlari.length; i++) {
        switch (gidilecekYonAdi) {
            case "up":
                if (yilaninKafasininBulunduguSatir - 1 === kuyrukKonumlari[i].satir && yilaninKafasininBulunduguSutun === kuyrukKonumlari[i].sutun) yilanKendineDokundu = true;
                break;
            case "down":
                if (yilaninKafasininBulunduguSatir + 1 === kuyrukKonumlari[i].satir && yilaninKafasininBulunduguSutun === kuyrukKonumlari[i].sutun) yilanKendineDokundu = true;
                break;
            case "left":
                if (yilaninKafasininBulunduguSutun - 1 === kuyrukKonumlari[i].sutun && yilaninKafasininBulunduguSatir === kuyrukKonumlari[i].satir) yilanKendineDokundu = true;
                break;
            case "right":
                if (yilaninKafasininBulunduguSutun + 1 === kuyrukKonumlari[i].sutun && yilaninKafasininBulunduguSatir === kuyrukKonumlari[i].satir) yilanKendineDokundu = true;
                break;
        }
    }
    return yilanKendineDokundu;
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

function yemekleAyniKonumdaMi() {
    return yemeginBulunduguSatir === yilaninKafasininBulunduguSatir && yemeginBulunduguSutun === yilaninKafasininBulunduguSutun;
}

function yemekCiz() {
    yemeginBulunduguSatir = Math.floor(Math.random() * satirSayisi);
    yemeginBulunduguSutun = Math.floor(Math.random() * sutunSayisi);
    for (let i = 0; i < kuyrukKonumlari.length; i++) {
        if (yemeginBulunduguSatir === kuyrukKonumlari[i].satir && yemeginBulunduguSutun === kuyrukKonumlari[i].sutun) {
            yemekCiz();
        }
    }
    kutuRenklendir(yemeginBulunduguSatir, yemeginBulunduguSutun, 'red');
    yemeginBulunduguOncekiSatir = yemeginBulunduguSatir;
    yemeginBulunduguOncekiSutun = yemeginBulunduguSutun;
    // kuyrugunBulunmadigiKonumlar.splice(0,kuyrugunBulunmadigiKonumlar.length);
    // let esit = false;
    // for (let satir = 0; satir < satirSayisi; satir++) {
    //     for (let sutun = 0; sutun < sutunSayisi; sutun++) {
    //         for(let kuyruktakiElemanlarIndex = 0; kuyruktakiElemanlarIndex < kuyrukKonumlari.length ; kuyruktakiElemanlarIndex++){
    //             if (kuyrukKonumlari[kuyruktakiElemanlarIndex].satir === satir && kuyrukKonumlari[kuyruktakiElemanlarIndex].sutun === sutun)
    //                 esit = true;
    //         }
    //         if (esit === false){
    //             kuyrugunBulunmadigiKonumlar.push({satir: satir, sutun: sutun});
    //         }
    //         else{
    //             esit = false;
    //         }
    //     }
    // }
    //
    // yemeginBulunduguSatir = Math.floor(Math.random() * satirSayisi);
    // yemeginBulunduguSutun = Math.floor(Math.random() * sutunSayisi);
    // console.log("satır : "+kuyrugunBulunmadigiKonumlar[yemeginBulunduguSatir].satir+" sutun : "+kuyrugunBulunmadigiKonumlar[yemeginBulunduguSutun].sutun)
    // kutuRenklendir(kuyrugunBulunmadigiKonumlar[yemeginBulunduguSatir].sutun, kuyrugunBulunmadigiKonumlar[yemeginBulunduguSutun].sutun, 'red');
    // yemeginBulunduguOncekiSatir = yemeginBulunduguSatir;
    // yemeginBulunduguOncekiSutun = yemeginBulunduguSutun;
}

function oncekiYemegiSil() {
    kutuRenklendir(yemeginBulunduguOncekiSatir, yemeginBulunduguOncekiSutun, 'white');
}

function yilaniOrtala() {
    kuyrukKonumlari.unshift({satir: satirlarinOrtasi, sutun: sutunlarinOrtasi});
}

function skorSifirla() {
    score = 0;
    skorGoster();
}

function skorArtir() {
    score += 10;
    skorGoster();
}

function skorGoster() {
    document.getElementById('score').innerHTML = score;
}

yatayCubuklariCiz();
dikeyCubuklariCiz();
yilaniOrtala();
yemekCiz();
skorGoster();
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

function gidilecekYonFonksiyonu() {
}

function yukariCik() {
    yilaninKafasininBulunduguSatir--;
}

function asagiIn() {
    yilaninKafasininBulunduguSatir++;
}

function solaGit() {
    yilaninKafasininBulunduguSutun--;
}

function sagaGit() {
    yilaninKafasininBulunduguSutun++;
}