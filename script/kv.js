document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const canvasWrap = document.querySelector('.canvas_wrap');
  const video = document.getElementById('video'); 
  const profileArea = document.getElementById('profile_area'); 
  const frameCount = 166; 
  let currentFrame = 0;
  let videoPlayed = false; 

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const images = [];
  for (let i = 0; i <= frameCount; i++) {
    const img = new Image();
    img.src = `/assets/img/kv/img_sq_pc_${i.toString().padStart(5, '0')}.webp`;
    images.push(img);
  }

  // 이미지 렌더링
  const render = (index) => {
    if (images[index] && images[index].complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = images[index];
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let renderWidth, renderHeight;

      if (imgRatio > canvasRatio) {
        renderWidth = canvas.width;
        renderHeight = renderWidth / imgRatio;
      } else {
        renderHeight = canvas.height;
        renderWidth = renderHeight * imgRatio;
      }

      const x = (canvas.width - renderWidth) / 2;
      const y = (canvas.height - renderHeight) / 2;

      ctx.drawImage(img, x, y, renderWidth, renderHeight);
    }
  };

  const updateFrame = () => {
    const canvasWrapRect = canvasWrap.getBoundingClientRect();
    const profileAreaRect = profileArea.getBoundingClientRect();
    const maxScrollTop = canvasWrap.offsetHeight - window.innerHeight;

    if (canvasWrapRect.top > 0 || canvasWrapRect.bottom < 0) {
      currentFrame = 0;
      render(currentFrame);
    } else {
      if (canvasWrapRect.top <= 0 && canvasWrapRect.bottom >= 0) {
        const start = -canvasWrapRect.top;
        const scrollFraction = start / maxScrollTop;
        currentFrame = Math.min(frameCount, Math.floor(scrollFraction * frameCount));
        render(currentFrame);
      }

      if (profileAreaRect.bottom <= window.innerHeight) {
        if (video && !videoPlayed) {
          video.style.display = 'block'; 
          video.currentTime = 0; 
          video.play();
          videoPlayed = true;
        }
      } else if (profileAreaRect.bottom > window.innerHeight) {
        if (video) {
          video.pause(); 
          video.style.display = 'none'; 
          videoPlayed = false;
        }
      }
    }
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateFrame);
  });

  images[0].onload = () => {
    render(0);
  };
});


document.addEventListener('DOMContentLoaded', () => {
  const videoSection = document.querySelector('main .sect_03 .video');

  function updateAfterPosition() {
    const videoRect = videoSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (videoRect.top < windowHeight && videoRect.bottom > 0) {
      const visibleHeight = Math.min(videoRect.bottom, windowHeight) - Math.max(videoRect.top, 0);
      let progress = visibleHeight / windowHeight;

      progress = Math.pow(progress, 0.1); 

      const newTopValue = Math.max(0, 200 - (progress * 200));

      videoSection.style.setProperty('--after-top', `${newTopValue}%`);
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateAfterPosition);
  });

  updateAfterPosition();
});


document.addEventListener('DOMContentLoaded', () => {
  const txtGroup = document.querySelector('main .sect_02 .txt_group');
  
  window.addEventListener('scroll', () => {
      const txtGroupRect = txtGroup.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (txtGroupRect.bottom < windowHeight * 0.67) {
          const progress = Math.min(1, (windowHeight * 0.67 - txtGroupRect.bottom) / (windowHeight * 0.33));
          txtGroup.style.opacity = 1 - progress;
      } else {
          txtGroup.style.opacity = 1; 
      }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const txtGroup = document.querySelector('main .sect_02 .txt_group');
  const video = document.getElementById('video');
  const startButton = document.querySelector('.start_btn');
  const pauseButton = document.querySelector('.pause_btn');

  // Play button click event
  startButton.addEventListener('click', () => {
    video.play();
    startButton.style.display = 'none';
    pauseButton.style.display = 'block';
  });

  // Pause button click event
  pauseButton.addEventListener('click', () => {
    video.pause();
    pauseButton.style.display = 'none';
    startButton.style.display = 'block';
  });

  // Initially show pause button since video is playing by default
  startButton.style.display = 'none';
  pauseButton.style.display = 'block';

  window.addEventListener('scroll', () => {
    const txtGroupRect = txtGroup.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (txtGroupRect.bottom < windowHeight * 0.5) {
        const progress = Math.min(1, (windowHeight * 0.5 - txtGroupRect.bottom) / (windowHeight * 0.5));
        txtGroup.style.opacity = 1 - progress;
    } else {
        txtGroup.style.opacity = 1; 
    }
  });
});

















