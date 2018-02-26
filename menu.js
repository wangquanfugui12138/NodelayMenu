/**
 * Created by admin on 2018/2/26.
 */
$(function () {
    var sub=$('#sub');

    var activeRow;
    var activeMenu;

    var timer;
    var mouseInSub=false;

    var mouseTrack=[];

    sub.on('mouserenter', function () {
        mouseInSub=true;
    }).on('mouseleave',function(){
        mouseInSub=false;
    })

    var mouseHandler= function (e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        })
        if(mouseTrack.length>=3){
            mouseTrack.shift();
        }
    }

    $('#test')
        .on('mouseenter',function(e){
            $(document).bind('mousemove',mouseHandler )
        })
        .on('mouseleave',function(e){
            sub.addClass('none');

            if(activeRow){
                activeRow.removeClass('active');
                activeRow=null;
            }
            if(activeMenu){
                activeMenu.addClass('none');
                activeMenu=null;
            }
            $(document).unbind('mousemove',mouseHandler)
        })
        .on('mouseenter','li', function (e) {
            sub.removeClass('none');
            if(!activeRow){
                activeRow=$(e.target).addClass('active');
                activeMenu=$('#'+activeRow.data('id'));
                activeMenu.removeClass('none');
                return
            }

            if(timer){
                clearTimeout(timer);
            }

            var cur=mouseTrack[1];
            var pre=mouseTrack[0];

            var delay=isNeed(sub,pre,cur);

            if(delay){
                timer=setTimeout(function () {
                    if(mouseInSub) return
                    activeRow.removeClass('active');
                    activeMenu.addClass('none');

                    activeRow=$(e.target).addClass('active');
                    activeMenu=$('#'+activeRow.data('id'));
                    activeMenu.removeClass('none');
                    timer=null;
                },300)
            }else{
                var preActiveRow=activeRow;
                var preActiveMenu=activeMenu;

                activeRow=$(e.target);
                activeMenu=$('#'+activeRow.data('id'));

                preActiveRow.removeClass('active');
                preActiveMenu.addClass('none');

                activeRow.addClass('active');
                activeMenu.removeClass('none');
            }
        })
});