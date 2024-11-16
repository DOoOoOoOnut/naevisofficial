document.querySelectorAll('.gnb a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href').slice(1); 
            const targetElement = document.getElementById(targetId);
        
            if (targetElement) {
            targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        }
    });
});


document.getElementById('video_play_btn').addEventListener('click', function () {
    const prevImg = document.querySelector('.prev_img');
    prevImg.classList.add('hidden');
    
    setTimeout(() => {
        prevImg.style.display = 'none';
    }, 1000);
    
    const iframe = document.querySelector('iframe');
    let src = iframe.src;

    if (!src.includes('autoplay=1')) {
        if (src.includes('?')) {
            src += '&autoplay=1';
        } else {
            src += '?autoplay=1';
        }
        iframe.src = src;
    }
});



// 탭기능

document.querySelectorAll('main .sect_02 .txt_group .profile_info .tabs .tab').forEach((tab, index) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('main .sect_02 .txt_group .profile_info .tabs .tab').forEach((tab) => {
            tab.classList.remove('now');
        });
        
        tab.classList.add('now');
        
        document.querySelectorAll('main .sect_02 .txt_group .profile_info .contents .content').forEach((content) => {
            content.classList.remove('now');
        });
        
        document.querySelectorAll('main .sect_02 .txt_group .profile_info .contents .content')[index].classList.add('now');
    });
});


document.querySelectorAll('main .sect_03 .btm_details .language .tabs .tab').forEach((tab, index) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('main .sect_03 .btm_details .language .tabs .tab').forEach((tab) => {
            tab.classList.remove('now');
        });
        
        tab.classList.add('now');
        
        document.querySelectorAll('main .sect_03 .btm_details .language .contents .content').forEach((content) => {
            content.classList.remove('now');
        });
        
        document.querySelectorAll('main .sect_03 .btm_details .language .contents .content')[index].classList.add('now');
    });
});


document.querySelectorAll('main .sect_07 .text_container .center_language .tabs .tab').forEach((tab, index) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('main .sect_07 .text_container .center_language .tabs .tab').forEach((tab) => {
            tab.classList.remove('now');
        });
        
        tab.classList.add('now');
        
        document.querySelectorAll('main .sect_07 .text_container .center_language .contents .content').forEach((content) => {
            content.classList.remove('now');
        });
        
        document.querySelectorAll('main .sect_07 .text_container .center_language .contents .content')[index].classList.add('now');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const visualBoxes = document.querySelectorAll('main .sect_06 .visual_container .visual_wrap .visual_box');
    const popup = document.querySelector('main .sect_06 .visual_popup');
    const popupImage = popup.querySelector('.photo img');
    const prevButton = popup.querySelector('.button_wrap .button_prev');
    const nextButton = popup.querySelector('.button_wrap .button_next');
    let currentIndex = -1;

    visualBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            currentIndex = index;
            updatePopupImage();
            popup.style.display = 'flex'; // 팝업을 보이게 합니다.
        });
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updatePopupImage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < visualBoxes.length - 1) {
            currentIndex++;
            updatePopupImage();
        }
    });

    // 팝업의 다른 영역을 클릭하면 닫힘
    popup.addEventListener('click', (e) => {
        if (!e.target.closest('.photo') && !e.target.closest('.button_wrap')) {
            popup.style.display = 'none';
        }
    });

    function updatePopupImage() {
        const visualBox = visualBoxes[currentIndex];
        const imgSrc = visualBox.querySelector('img').src;
        popupImage.src = imgSrc;

        // 버튼 상태 업데이트
        if (currentIndex === 0) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }

        if (currentIndex === visualBoxes.length - 1) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }
});









