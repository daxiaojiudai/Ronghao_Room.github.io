;(function () {
    
    var ul = document.querySelector('.jd_content_left ul');
    var jd_content_left = document.querySelector('.jd_content_left');

    var startY;
    var currentY = 0;

    ul.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    })
    ul.addEventListener('touchmove', function (e) {
        var distanceY = e.touches[0].clientY - startY;
        ul.style.transition = 'none';
        ul.style.transform = "translateY("+(currentY + distanceY)+"px)";
    })
    ul.addEventListener('touchend', function (e) {
        var distanceY = e.changedTouches[0].clientY - startY;
        currentY += distanceY;
        
        if (currentY > 0) {
            currentY = 0;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateY(0px)';
        }
        var minY = - (ul.offsetHeight - jd_content_left.offsetHeight);

        if (currentY < minY) {
            currentY = minY;
            ul.style.transition = "all, .5s";
            ul.style.transform = "translateY("+minY+"px)";
        }
    })

})();

;(function () {
    
    window.addEventListener('load', function () {
        new IScroll(".jd_content_right", {
            scrollX: false,
            scrollY: true
        });
    })

})();