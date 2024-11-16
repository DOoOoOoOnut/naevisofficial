document.addEventListener('DOMContentLoaded', () => {
    const txtProgress = document.querySelector('.txt_progress');
    const sectIntro = document.querySelector('.sect_00.intro');
  
    let progress = 0;
  
    const incrementProgress = () => {
      const interval = setInterval(() => {
        if (progress < 100) {
          progress++;
          txtProgress.innerText = `${progress}%`;
        } else {
          clearInterval(interval);
  
          setTimeout(() => {
            sectIntro.classList.add('intro_fade_out');
          }, 1000); 
        }
      }, 30); 
    };
  
    setTimeout(() => {
      incrementProgress();
    }, 500); 
  });
  



document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (!header) return;

    const sections = [
        { section: document.querySelector('.sect_01'), className: 'h_white' },
        { section: document.querySelector('.sect_02'), className: 'h_white' },
        { section: document.querySelector('.sect_07'), className: 'h_white' },
        { section: document.querySelector('.sect_03'), className: 'h_black' },
        { section: document.querySelector('.sect_05'), className: 'h_black' },
        { section: document.querySelector('.sect_06'), className: 'h_black' },
        { section: document.querySelector('.sect_08'), className: 'h_black' },
        { section: document.querySelector('.floating_txt'), className: 'h_none' },
        { section: document.querySelector('footer'), className: 'h_none' }
    ].filter(item => item.section); 

    const options = {
        root: null,
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0.5
    };

    let currentClass = '';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSection = sections.find(item => item.section === entry.target);
                if (activeSection) {
                    const newClass = activeSection.className;

                    if (newClass !== currentClass) {
                        if (currentClass) {
                            header.classList.remove(currentClass);
                        }
                        header.classList.add(newClass);
                        currentClass = newClass;
                    }
                }
            }
        });
    }, options);

    sections.forEach(({ section }) => {
        if (section) {
            observer.observe(section);
        }
    });

    window.addEventListener('scroll', () => {
        let foundClass = '';

        sections.forEach(({ section, className }) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect && rect.top <= 80 && rect.bottom >= 80) {
                    foundClass = className;
                }
            }
        });

        if (foundClass && foundClass !== currentClass) {
            if (currentClass) {
                header.classList.remove(currentClass);
            }
            header.classList.add(foundClass);
            currentClass = foundClass;
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {

    const headLogo = document.querySelector('header .head_logo');

    if (headLogo) {
        headLogo.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
