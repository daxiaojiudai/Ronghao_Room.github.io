; (function () {

    var jd_header = document.querySelector('.jd_header');

    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset;
        var opacity = 0;
        if (scrollTop > 180) {
            opacity = 0.9;
        } else {
            opacity = scrollTop / 600 * 0.9;
        }
        jd_header.style.backgroundColor = "rgba(222,24,27," + opacity + ")";
    })

})();

; (function () {

    var ul = document.querySelector('.seckill_content ul');
    var lis = ul.children;
    var liWidth = lis[0].offsetWidth;
    var ulWidth = liWidth * lis.length;
    ul.style.width = ulWidth + 'px';

})();

; (function () {

    var spans = document.querySelectorAll('.seckill_title .time span:nth-child(2n-1)');

    setTime();
    var timer = setInterval(setTime, 1000);

    function setTime() {
        var seckillTime = new Date("2018/12/25 00:00");
        var now = new Date();
        var time = parseInt((seckillTime - now) / 1000);
        if (time <= 0) {
            clearInterval(timer);
            time = 0;
        }
        var hours = parseInt(time / 3600);
        var minutes = parseInt(time / 60) % 60;
        var seconds = time % 60;
        spans[0].innerHTML = addZero(hours);
        spans[1].innerHTML = addZero(minutes);
        spans[2].innerHTML = addZero(seconds);
    }
    function addZero(n) {
        return n < 10 ? "0" + n : n;
    }


})();


; (function () {

    var ul = document.querySelector('.jd_news .info ul');
    var lis = ul.children;
    var liHeight = lis[0].offsetHeight;
    var index = 0;

    setInterval(function () {
        index++;
        ul.style.transition = "all .5s";
        ul.style.transform = "translateY(-" + index * liHeight + "px)";
    }, 1000);

    ul.addEventListener('transitionend', function () {
        if (index >= lis.length - 1) {
            index = 0;
            ul.style.transition = "none";
            ul.style.transform = "translateY(0px)";
        }
    })

})();


; (function () {

    var ul = document.querySelector('.jd_banner ul');
    var lis = ul.children;
    var liWidth = lis[0].offsetWidth;
    var olLis = document.querySelectorAll('.jd_banner ol li');
    var index = 1;

    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * liWidth);
    }, 3000);

    ul.addEventListener('transitionend', function () {
        if (index >= lis.length - 1) {
            index = 1;
            removeTransition();
            setTranslateX(-index * liWidth);
        }
        if (index <= 0) {
            index = lis.length - 2;
            removeTransition();
            setTranslateX(-index * liWidth);
        }
        olLis.forEach(function (v,i) {
            v.classList.remove('now');
        })
        olLis[index-1].classList.add('now');
    })

    // 封装函数,处理兼容性
    function addTransition() {
        ul.style.transition = "all .2s";
        ul.style.webkitTransition = "all .2s";
    }
    function removeTransition() {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }
    function setTranslateX(v) {
        ul.style.transform = "translateX(" + v + "px)";
        ul.style.webkitTransform = "translateX(" + v + "px)";
    }


    var startX = 0;
    var startTime;

    ul.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startTime = new Date();
        clearInterval(timer);
    });

    ul.addEventListener('touchmove', function (e) {
        var distanceX = e.touches[0].clientX - startX;
        removeTransition();
        setTranslateX(-index*liWidth + distanceX);
    });

    ul.addEventListener('touchend', function (e) {
        var endTime = new Date();
        var time = endTime - startTime;
        var distanceX = e.changedTouches[0].clientX - startX;
        if (distanceX > 1/3*liWidth || (time < 300 && distanceX > 50) ) {
            index--;
        }
        if (distanceX < -1/3*liWidth || (time < 300 && distanceX < -50)) {
            index++;
        }
        addTransition();
        setTranslateX(-index*liWidth);

        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * liWidth);
        }, 3000);
    });

    window.addEventListener('resize', function () {
        liWidth = lis[0].offsetWidth;
        removeTransition();
        setTranslateX(-index*liWidth);
    })

})();
