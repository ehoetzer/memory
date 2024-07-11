$(document).ready(() => {
    "use strict";
    // ------- Funktionen ---------
    const randomInt = function(n1, n2) {
        return Math.floor((Math.random() * (n2 - n1 + 1))) + n1; 
    }
    const mischen = function(arr, count) {
        let n = arr.length - 1;
        for (let i = 0; i < count; i++) {
            let ix1 = randomInt(0, n),
                ix2 = randomInt(0, n);
            let tmp = arr[ix1];
            arr[ix1] = arr[ix2];
            arr[ix2] = tmp;
        }
    };
    const wechsleSpieler = function() {
        if (stand.amZug == 1) {
            $('#name1').html(stand.name1);
            $('#name2').html(stand.name2 + ' (am Zug)');
            stand.amZug = 2;
        } else {
            $('#name1').html(stand.name1 + ' (am Zug)');
            $('#name2').html(stand.name2);
            stand.amZug = 1;
        }
    }
    const pruefeZug = function() {
        stand.started = true; // Klicken wieder freigeben
        if (stand.karte1 != stand.karte2) {
            $('#' + stand.id1).attr('src', 'img/rseite.jpg');
            $('#' + stand.id2).attr('src', 'img/rseite.jpg');
            stand.id1 = 'k0';  // Kennzeichen für "neuer Zug beginnt"
            wechsleSpieler();
            return;
        }
        if (stand.amZug == 1) {
            stand.punkte1++;
            $('#punkte1').html(stand.punkte1);
        } else {
            stand.punkte2++;
            $('#punkte2').html(stand.punkte2);
        }
        $('#' + stand.id1).attr('src', 'img/leer.jpg');
        $('#' + stand.id2).attr('src', 'img/leer.jpg');
        stand.id1 = 'k0';
        if (stand.punkte1 + stand.punkte2 == 18) { // Spiel beendet
            if (stand.punkte1 > stand.punkte2) {
                $('#name1').html(stand.name1 + ' ist Sieger!');
                $('#name2').html(stand.name2);
            } else if (stand.punkte2 > stand.punkte1) {
                $('#name1').html(stand.name1);
                $('#name2').html(stand.name2 + ' ist Sieger!');
            } else {
                $('#name1').html(stand.name1 + ' Gleichstand');
                $('#name2').html(stand.name2 + ' Gleichstand');
            }
        }
    };
    const imgClick = function(event) {
        if (!stand.started)
            return;
        let karte = $(event.target).attr('src'),
            id = $(event.target).attr('id'),
            ix = parseInt(id.substring(1)) - 1;
        karte = karte.split('/')[1].split('.')[0];
        if (karte != 'rseite')
            return;
        $(event.target).attr('src', 'img/' + karten[ix] + '.png');
        if (stand.id1 == 'k0') { // erste Karte aufgedeckt 
            stand.id1 = id;
            stand.karte1 = karten[ix];
        } else {  // zweite Karte aufgedeckt
            stand.id2 = id;
            stand.karte2 = karten[ix];
            stand.started = false;
            setTimeout(pruefeZug, 1500);
        }
    };
    const startClick = function() {
        stand.name1 = $('#inName1').val();
        stand.name2 = $('#inName2').val();
        if (stand.name1 == '' || stand.name2 == '') {
            alert('Namen sind nicht beide gefüllt');
            return;
        }
        wechsleSpieler();
        $('tr.start').hide();
        $('tr.stand').show();
        stand.started = true;
    };

    // --------- Daten -----------
    let karten = ['Mem1', 'Mem2', 'Mem3', 'Mem4', 'Mem5', 'Mem6',
        'Mem7', 'Mem8', 'Mem9', 'Mem10', 'Mem11', 'Mem12',
        'Mem13', 'Mem14', 'Mem15', 'Mem16', 'Mem17', 'Mem18'];
    karten = karten.concat(karten);
    let stand = {
        started: false,
        name1: 'Spieler 1',
        name2: 'Spieler 2',
        punkte1: 0,
        punkte2: 0,
        amZug: 2,
        id1: 'k0',
        id2: 'k0',
        karte1: '',
        karte2: ''
    };

    // --------- Spiel starten -----------
    mischen(karten, 500);
    $('tr.stand').hide();
    $('#btnStart').click(startClick);
    $('table').on('click', 'img', imgClick);
});
