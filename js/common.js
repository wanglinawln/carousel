var $banner=(function(){
    var $ban=$('<div>'

        +'<div class="slider" id="slider">'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
            +'<div class="slide"><img src="img/b2.png" alt=""></div>'
            +'<div class="slide"><img src="img/b3.png" alt=""></div>'
            +'<div class="slide"><img src="img/b4.png" alt=""></div>'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
        +'</div>'
        +'<span id="left"><</span>'
        +'<span id="right">></span>'
        +'<ul class="nav" id="navs">'
            +'<li class="active">1</li>'
            +'<li>2</li>'
            +'<li>3</li>'
            +'<li>4</li>'
            +'<li>5</li>'
        +'</ul>'
        +'</div>');
    var cfg={
        container:"body",
    }
    var $oNavlist =$ban.find("#navs").children();
    var $slider = $ban.find('#slider');
    
    var $left = $ban.find('#left');
    var $right = $ban.find('#right');
    var index = 1;
    var timer;
    var isMoving = false;
    function next(){
        if(isMoving){
            return;
        }
        isMoving = true;
        index++;
        navmove();
        animate($slider,{left:-1200*index},function(){
            if(index==6){
                $slider.css("left","-1200px");
                index = 1;
            }
            isMoving = false;
        });
    }
    function prev(){
        if(isMoving){
            return;
        }
        isMoving = true;
        index--;
        navmove();
        animate($slider,{left:-1200*index},function(){
            if(index==0){
                $slider.css("left","-6000px");
                index = 5;
            }
            isMoving = false;
        });
    }
    function navmove(){
        for( var i=0; i<$oNavlist.length; i++ ){
            console.log($oNavlist[i]);
            $oNavlist[i].className="";
        }
        if(index >5 ){
            $oNavlist[0].className="active";
        }else if(index<=0){
            $oNavlist[4].className="active";
        }else {
            $oNavlist[index-1].className="active";
        }
    }
    function animate(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var isStop = true;
            for(var attr in json){
                var now = 0;
                if(attr == 'opacity'){
                    now = parseInt(obj.css(attr)*100);
                }else{
                    now = parseInt(obj.css(attr));
                }
                var speed = (json[attr] - now) / 8;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(attr == 'opacity'){
                    obj.css(attr,cur / 100);
                }else{
                    obj.css(attr,cur + 'px');
                }
                if(json[attr] !== cur){
                    isStop = false;
                }
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        }, 30)
    }
    
    function show(conf){
        var $box=$(conf.container);
        $box.append($ban);
        $.extend(cfg,conf);
        $box.mouseover(function(){
			animate($left,{opacity:50})
			animate($right,{opacity:50})
			clearInterval(timer)
		})
		$box.mouseout(function(){
			animate($left,{opacity:0})
			animate($right,{opacity:0})
			timer = setInterval(next, 3000);
		})
		$right.click(next);
		$left.click(prev);
		for( var i=0; i<$oNavlist.length; i++ ){
            
			(function(i){
				$oNavlist[i].onclick = function(){
					index = i+1;
					navmove();
					animate($slider,{left:-1200*index});
				}
			})(i);
        }
        timer = setInterval(next, 3000);
    }
    return{
        show:show
    }
}());