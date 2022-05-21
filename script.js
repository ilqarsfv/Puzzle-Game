$(() => {
    let arr = []
    const oyun = $("#oyun")
    for (let i = 0; i < 4; i++) {
        arr[i] = []
        for (let j = 0; j < 6; j++) {
            oyun.append(`<div></div>`)
            oyun.children().last().css({
                left: `${100 * j}px`,
                top: `${100 * i}px`,
                background: `url('puzzle.jpg') ${-100 * j}px ${-100 * i}px`,
                'object-fit': 'cover',
            })
        }
        console.log(arr[i]);
    }
    oyun.children().draggable({
        containment: "window",
        snap: oyun.children(),
        snapMode: 'inner',
        cursor: "crosshair",
        cursorArt: { top: 50, left: 50 },
        start: function () {
            $(this).css({
                transform: `rotate(0deg)`,
                zIndex: 99,
            })
        },
        drag: function () {
        },
        stop: function () {
            let p = $(this).position()
            if (p.top < 400 && p.left < 600) {
                $(this).css({
                    left: 100 * Math.round(p.left / 100),
                    top: 100 * Math.round(p.top / 100),
                    'box-shadow': 'none',
                })
                check($(this))
            }
        }
    })
    function check(elem) {
        let a = parseInt(elem[0].style.left) / 100;
        let b = parseInt(elem[0].style.top) / 100;
        let c = parseInt(elem[0].style.backgroundPositionX) / -100;
        let d = parseInt(elem[0].style.backgroundPositionY) / -100;
        console.log(elem.length);
        if (a == c && b == d) arr[b][a] = true;

        for (i = 0; i < 4; i++) {
            for (j = 0; j < 6; j++) {
                if (!arr[i][j]) return;
            }
        }
        alert("Game Over, Congratulations!!!");
    }
    oyun.after('<button>Start</button>')
    $('button').click(function () {
        for (let i = 0; i < 24; i++) {
            oyun.children().eq(i).css({
                left: `${rand(700, $(window).width() - 150)}px`,
                top: `${rand(25, 400)}px`,
                transform: `rotate(${rand(-45, 45)}deg)`,
                'box-shadow': '0 0 5px #333'
            })
        }
    })
    $('button').css({
        'margin-left': '20%',
        'margin-top': '20px'
    })
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})