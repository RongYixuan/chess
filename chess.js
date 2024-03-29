$(function () {
    let box = $('.box')
    let flag = true
    let black = {}, white = {}
    let blank = {}
    let ai = true;

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            $('<div>').addClass('chess').attr('id', i + '_' + j).appendTo(box)
            blank[i + '_' + j] = true;
        }
    }
    box.on('click', '.chess', function () {


        let _this = $(this);
        let coords = _this.attr('id')
        if (flag) {
            if (_this.hasClass('black') || _this.hasClass('white')) {
                return;
            } else {

                black[coords] = true
                delete blank[coords]
                $(this).addClass('black')
                flag = !flag;
                if (isSuccess(black, coords) >= 5) {
                    document.write('黑子胜')
                    box.off('click')
                }
                if (ai) {
                    let pos = aifn();
                    white[pos] = true;
                    delete blank[pos]
                    $('#' + pos).addClass('white')
                    if (isSuccess(white, pos) >= 5) {
                        document.write('白子胜')
                        box.off('click')
                    }
                    flag = !flag;
                }
            }
        
        }
    })
    function aifn() {
        let blackSore=0,whiteSore=0;
        let pos1,pos2;
        for(let i in blank){
            let sore=isSuccess(black,i);
            if(sore>=blackSore){
                blackSore=sore;
                pos1=i;
            }
        }
        for(let i in blank){
            let sore=isSuccess(white,i);
            if(sore>=whiteSore){
                whiteSore=sore;
                pos2=i;
            }
        }
        return blackSore>=whiteSore? pos1:pos2;
    }
    function isSuccess(obj, coords) {
        let sp = 1, cz = 1, zx = 1, yx = 1;
        let [x, y] = coords.split('_')
        let i = x * 1, j = y * 1;
        //sp
        while (obj[i + '_' + (++j)]) {
            sp++
        }
        j = y * 1;
        while (obj[i + '_' + (--j)]) {
            sp++
        }
        //cz
        j = y * 1;
        while (obj[++i + '_' + j]) {
            cz++
        }
        i = x * 1;
        while (obj[--i + '_' + j]) {
            cz++
        }
     
        i = x * 1, j = y * 1
        while (obj[--i + '_' + (++j)]) {
            yx++
        }
        i = x * 1, j = y * 1

        while (obj[++i + '_' + (--j)]) {
            yx++
        }
      
        i = x * 1, j = y * 1

        while (obj[++i + '_' + (++j)]) {
            zx++
        }
        i = x * 1, j = y * 1

        while (obj[--i + '_' + (--j)]) {
            zx++
        }
        return Math.max(sp, cz, zx, yx) ;
    }
})
