document.addEventListener('DOMContentLoaded', function () {
  const kv = document.querySelector('.kv');
  const kvMainVideo = document.querySelector('.kv-main__video');
  const kvMainVideoContent = kvMainVideo.querySelectorAll('video');
  const btnPause = document.querySelector('.c-btn--pause');
  const btnText = btnPause.querySelector('span');
  const wrapper = document.querySelector('.kv-main__img-wrap');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const frameCount = 167;
  
  let type = window.innerWidth <= 768 ? 'mo' : 'pc';
  let isPlayingVideo = false;
  let hasPlayed = false;
  const images = {
    pc: [],
    mo: []
  };

  canvas.width = window.innerWidth;
  canvas.height = wrapper.clientHeight;

  const currentFrame = (idx) => {
    return `/assets/img/kv/img_sq_${type}_${idx.toString().padStart(5, '0')}.webp`;
  };

  const setImages = (cb) => {
    if (images[type].length !== frameCount) {
      images[type] = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images[type].push(img);
        if (i === 0) {
          img.addEventListener('load', () => cb(img));
        }
      }
    }
  };

  const render = (index) => {
    const winW = document.documentElement.clientWidth;
    const winH = wrapper.clientHeight;
    const img = images[type][index];
    if (img && img.complete && img.naturalWidth) {
      const imgRatio = img.height / img.width;
      const winRatio = winH / winW;
      canvas.width = winW;
      canvas.height = winH;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (imgRatio > winRatio) {
        const h = winW * imgRatio;
        ctx.drawImage(img, 0, (winH - h) / 2, winW, h);
      } else if (imgRatio < winRatio) {
        const w = (winW * winRatio) / imgRatio;
        ctx.drawImage(img, (winW - w) / 2, 0, w, winH);
      } else {
        ctx.drawImage(img, 0, 0, winW, winH);
      }
    }
  };

  function progressFullUpdate(progress) {
    const index = Math.floor(progress * (frameCount - 1) * 1.1);
    render(index);
    if (progress >= (type === 'mo' ? 0.8 : 0.8)) {
      if (isPlayingVideo || hasPlayed) return;
      kvMainVideo.classList.add('s-active');
      btnPause.style.backgroundImage = 'url(/assets/img/ico_pause.png)';
      kvMainVideoContent.forEach((el) => {
        el.play();
        if (!el.paused) {
          isPlayingVideo = true;
          hasPlayed = true;
        }
      });
    } else {
      isPlayingVideo = false;
      hasPlayed = false;
      kvMainVideo.classList.remove('s-active');
      kvMainVideoContent.forEach((el) => {
        el.pause();
        el.currentTime = 0;
      });
    }
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const sectionOffsetTop = kv.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = kv.offsetHeight;
    const progress = Math.min(Math.max((scrollTop - sectionOffsetTop + window.innerHeight / 3) / sectionHeight, 0), 1);
    progressFullUpdate(progress);
    kv.style.setProperty('--progress-full', progress);
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    type = window.innerWidth <= 768 ? 'mo' : 'pc';
    setImages(() => {
      handleScroll();
    });
    canvas.width = window.innerWidth;
    canvas.height = wrapper.clientHeight;
  });

  setImages(() => {
    handleScroll();
  });

  btnPause.addEventListener('click', () => {
    kvMainVideoContent.forEach((el) => {
      if (el.paused) {
        el.play();
        isPlayingVideo = true;
        btnPause.style.backgroundImage = 'url(/assets/img/ico_pause.png)';
        btnText.innerText = 'Pause';
      } else {
        el.pause();
        isPlayingVideo = false;
        btnPause.style.backgroundImage = 'url(/assets/img/ico_play.png)';
        btnText.innerText = 'Play';
      }
    });
  });
});
