// 成都城市宣传页交互：导航滚动状态 + 渐显动画 + Hero 声音开关
(function () {
  var nav = document.getElementById('site-nav');
  var heroVideo = document.getElementById('hero-video');
  var soundBtn = document.getElementById('sound-toggle');

  // 导航栏滚动状态
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 元素进入视口渐显
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Hero 视频声音开关
  if (soundBtn && heroVideo) {
    soundBtn.addEventListener('click', function () {
      var muted = heroVideo.muted;
      heroVideo.muted = !muted;
      if (muted) { heroVideo.play(); }
      soundBtn.classList.toggle('on', !heroVideo.muted);
      soundBtn.setAttribute('aria-label', heroVideo.muted ? '开启声音' : '关闭声音');
    });
  }
})();
