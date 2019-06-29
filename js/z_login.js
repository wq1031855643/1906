//屏幕缩小时， 位置固定
window.onresize = resize;
function resize() {
    var winW = $(window).width();
    if (winW < 1190) {
        $('.z_header').addClass('z_header2').removeClass('z_header')
        $('.z_wrap_login').addClass('z_wrap_login2').removeClass('z_wrap_login')
    }
    if (winW >= 1190) {
        $('.z_heaMove').addClass('z_header').removeClass('z_header2')
        $('.z_wrap_move').addClass('z_wrap_login').removeClass('z_wrap_login2')
    }
};

// 点击区号显示隐藏
$('.z_wrap_sele').bind('click',function () {
    if($('.z_openLi ul')[0]){
        tog2()
        return
    };
    $('.z_icon_sele').css({
        "background-position":'2px -86px',   
    });
    $.ajax({
        type:'get',
        url:'data/code.json',
        dataType:'json',
        success:function (json) {
            var str = '';
            var $ul = $('<ul></ul>')
            $('.z_openLi').append($ul)
            for(var i=0, ln = json.length;i<ln;i++){
                str += '<li data-val='+json[i].num+'><span class="num">'+json[i].num+'</span>'+json[i].county+'</li>'
            }
            $ul.html(str);
        }
    });
    $(document).bind('click',function(){
        $('.z_openLi ul').remove()
        tog2();
    });
    return false;
});
$('.z_phone').on("mouseover","li",function () {
    $(this).css({background:'rgb(242,245,249)'}).siblings('li').css("background","white")
},
);
$('.z_phone').on('click','li',function(){
    $('.z_openLi').children().remove()
    $('.z_select').html($(this).find('.num').html())
    tog2()
});


 function tog2() {
    $('.z_openLi ul').remove()
    $('.z_icon_sele').css({
        "background-position":'2px -54px',   
    })
};
//滑块验证
var z_boxMoveFlag = false;
$('.z_boxMove').bind('mousedown',function(e){
    var x = e.clientX-parseInt($(this).css('left'))
    var $this = $(this)
    $(document).bind('mousemove',function (e) {
        var _x = e.clientX -x;
        var maxW =$this.parent().width()-$this.width()+2
        if(_x>0 && _x< maxW){
            $this.css({
                left:_x,
            })
        }else if(_x>maxW){
            dragok()
            z_boxMoveFlag = true;
        }
        return false
    })
    $(document).bind('mouseup',function(){
        console.log(parseInt($this.css("left")))
        if(parseInt($this.css("left"))<$this.parent().width()-$this.width()+2){
            $this.animate({
                "left":0
            },500,'linear')
        }
        $(document).unbind('mousemove')
        $(document).unbind('mouseup')
        return false
    })
});
function dragok(){
    $('.z_bg b').text('验证通过')
    $('.z_boxMove i').addClass('icon-duigoutianchong-').removeClass('icon-shuangyoujiantou-')
    $('.z_boxMove').css("left","276px")
    $('.z_boxMove').unbind('mousedown');
    $(document).unbind('mousemove');
    $(document).unbind('mouseup');
}

//  手机号验证
$('.z_inp_phone').bind('focus',function(){
    $('.z_bor_phon').addClass('z_inp_focus')
    $('.z_book').addClass('z_book1')
})
$('.z_inp_phone').bind('blur',function(){
    $('.z_bor_phon').removeClass('z_inp_focus')
    $('.z_book').removeClass('z_book1')
})




//密码
$('.z_ipt_pass').bind('focus',function(){
    $('.z_bor_pass').addClass('z_inp_focus')
    $('.z_pass_i').addClass('z_book1')
})
$('.z_ipt_pass').bind('blur',function(){
    $('.z_bor_pass').removeClass('z_inp_focus')
    $('.z_pass_i').removeClass('z_book1')
})

$('.z_inp_mess').bind('focus',function(){
    $('.z_inp_me').addClass('z_inp_focus')
    $('.z_mess_i').addClass('z_mess_i1')
})
$('.z_inp_mess').bind('blur',function(){
    $('.z_inp_me').removeClass('z_inp_focus')
    $('.z_mess_i').removeClass('z_mess_i1')
})


// 提交
var phoneFlage = false
$('form').submit(function () {
    var reg = /1[1-8]\d{9}/;
    if($('.z_inp_phone').val()==""){
        $('.err_phone').html('请填写手机号').css('display','block')
    }else if(reg.test($('.z_inp_phone').val())){
        $('.err_phone').css('display','none')
        phoneFlage=true;
    }else{
        $('.err_phone').html('请填写正确的手机号').css('display','block')
    }
    if(z_boxMoveFlag == false){
        $('.boxFlage').css('display','block').html('请滑动完成验证')
    }else{
        $('.boxFlage').css('display','none')
    }

    if(reg.test($('.z_inp_phone').val()) &&z_boxMoveFlag){
    }else{
      //  $.alertable.alert('验证通过');
        return false
    }
});

//微信二维码#9fa3b0
$('.z_link_wechat').bind('mouseover',function(){
    $(this).css('color','#5dd5c8')
})
$('.z_link_wechat').bind('mouseout',function(){
    $(this).css('color','#9fa3b0')
})
$('.z_link_wechat').bind('click',function(){
   // $.alertable.alert('请使用微信扫码二维码登录');
   $('.weixinBox').css('display','block')
   return false
})
$(document).bind('click',function(){
    $('.weixinBox').css('display','none')
})

// 登录方式切换 密码登录 --短信登录 --扫码登录
// $('.z_sign_tab').on('click','span',function(){
//     $(this).addClass('cur').siblings().removeClass('cur')

// })
$('.z_sign_tab span').each(function(index,ele){
    $(ele).bind('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur')
        $('.z_mainBox0').css('display','none')
        $('.z_mainBox1').css('display','none')
        $('.z_mainBox2').css('display','none')
        $('.z_mainBox'+index).css('display','block')
    })
})