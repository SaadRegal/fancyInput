/*!
 * Fancy Input jQuery Plugin v1.0.0
 * https://github.com/SaadRegal/fancyInput
 */

$.fn._fade = function (dir) {
    if (dir === 'up') {
        this.animate({bottom: '5px', opacity: 1}, 200)
    } else if (dir === 'down') {
        this.animate({bottom: '0', opacity: 0}, 200)
    }
};

$.fn.fancyInput = function ({compact=true,margin=0,borderSize='3px',duration=200,darkColor='black',lightColor='#f7f7f7',event='keyup',callback,onBlur,validation=false}={}) {

    const helper = $(document.createElement("pre")).attr('id','FIHelper');
    helper.css({display:'none'});
    if(!$('#FIHelper').length){
        $('body').append(helper);
    }

    const border = $(document.createElement("div"))
        .addClass('fancyInputBorder')
        .css({'height':`${borderSize}`,'background-color': lightColor,width:'100%',transition:`all ${duration}ms ease-in-out`});
    this.append(border);

    this.each(function () {
        const fi=this;
        const input = $('input', this);
        const label = $('label', this);
        const border=$('.fancyInputBorder',this);
        const charLength = input.css('font-size').match(/\d+/)[0];
        const charFF = input.css('font-family');

        if (input.val().length !== 0) {
            label._fade('up');
            helper.css({'font-size': charLength + 'px', 'font-family': charFF}).text(input.val());
            border.css({width: helper.width() + margin + 'px','background-color':darkColor})
        }
        input.on('focus', function () {
            label._fade('up');
        });
        input.on('blur', function () {
            if (onBlur instanceof Function) { onBlur(input,label,charLength); }
            border.css('background-color',lightColor);
            if (input.val().length === 0) {
                if(validation){$(fi).removeClass('error success info warning');}
                label._fade('down')
            }
        });
if(compact){
    input.on(event, function () {
        if (input.val().length !== 0) {
            const helper=$('#FIHelper');
            helper.css({'font-size': charLength + 'px', 'font-family': charFF}).text(input.val());
            let width=helper.width();
            border.css({width: width + margin + 'px','background-color':darkColor});
            if (callback instanceof Function) { callback(input,label,charLength,width); }
        } else {
            border.css({width: '100%','background-color':lightColor});
        }
    })
}
    })
};