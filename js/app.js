window.addEventListener("DOMContentLoaded", () => {
	let locoScroll = null;
  var scrollContainer = document.querySelector('[data-scroll-container]');
	let updateScroll = function updateScroll(scrollContainer) {
		new ResizeObserver(function () {
			return locoScroll.update();
		}).observe(scrollContainer);
	};
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);

  function initScroll() {
    var scrollContainer = document.querySelector(".scroll-container");

    if(window.innerWidth < 767) return
    locoScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      getDirection: true,
      tablet: {
        breakpoint: 576,
        smooth: true
      },
      smartphone: {
        breakpoint: 0,
        smooth: false
      }
    });
    locoScroll.on("scroll", ScrollTrigger.update);
  
    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        return arguments.length 
        ? locoScroll.scrollTo(value, 0, 0) 
        : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: scrollContainer.style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.defaults({ scroller: scrollContainer });
    updateScroll(scrollContainer);

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }

  // accordion 
  const accordionHeaders = document.querySelectorAll('.accordion__header');
  const accordionBodies = document.querySelectorAll('.accordion__body');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const activeClass = 'accordion__header--active';

      accordionBodies.forEach((otherBody) => {
        const otherHeader = otherBody.previousElementSibling;
        if (otherHeader !== header && otherHeader.classList.contains(activeClass)) {
          otherHeader.classList.remove(activeClass);
          otherBody.style.maxHeight = '0px';
        }
      });

      if (header.classList.contains(activeClass)) {
        header.classList.remove(activeClass);
        body.style.maxHeight = '0px'
      } else {
        header.classList.add(activeClass);
        const height = body.querySelector('.accordion__inner').scrollHeight + 'px';
        body.style.maxHeight = height
      }
    });
  });

  // welcome 
  try {
    var swiper = new Swiper(".welcome-slider", {
      effect: 'fade',
      speed: 800,
      autoplay: {
        delay: 5000,
      },
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: ".welcome .swiper-button-next",
        prevEl: ".welcome .swiper-button-prev",
      },
    });
  } catch (error) { }


  // file-drop
  if (document.querySelector('.file-drop-area')) {
    const fileInput = document.querySelectorAll('.file-input');

    fileInput.forEach(function (input) {
      input.addEventListener('dragenter', function () {
        input.closest('.file-drop-area').classList.add('is-active');
      });
      input.addEventListener('focus', function () {
        input.closest('.file-drop-area').classList.add('is-active');
      });
      input.addEventListener('click', function () {
        input.closest('.file-drop-area').classList.add('is-active');
      });
    });

    fileInput.forEach(function (input) {
      input.addEventListener('dragleave', function () {
        input.closest('.file-drop-area').classList.remove('is-active');
      });
      input.addEventListener('blur', function () {
        input.closest('.file-drop-area').classList.remove('is-active');
      });
      input.addEventListener('drop', function () {
        input.closest('.file-drop-area').classList.remove('is-active');
      });
    });


    fileInput.forEach(function (input) {
      input.addEventListener('change', function () {
        const files = Array.from(this.files);
        const filesCount = files.length;
        const textContainer = this.previousElementSibling;

        if (filesCount === 1) {
          const fileName = this.value.split('\\').pop();
          textContainer.textContent = fileName;
        } else if (filesCount > 1 && filesCount < 5) {
          textContainer.textContent = `${filesCount} файлa добавлено`;
        } else {
          textContainer.textContent = `${filesCount} файлов добавлено`;
        }

        const maxSize = 3 * 1024 * 1024; // 3 MB
        const oversizedFiles = files.filter(function (file) {
          return file.size > maxSize;
        });

        if (oversizedFiles.length > 0) {
          alert('максимум 3 MB:\n\n' + oversizedFiles.map(function (file) { return file.name }).join('\n'));
          this.value = '';
          textContainer.innerHTML = 'Перетащите сюда или <span class="file-msg-blue">загрузите файлы</span> doc, .docx, .rtf, .pdf, .odt, .jpg, .png менее 8 mb';
        }
      });
      input.addEventListener('drop', function (event) {
        if (event.dataTransfer && event.dataTransfer.files) {
          event.preventDefault();
          const files = event.dataTransfer.files;
          const filesCount = files.length;
          const textContainer = this.previousElementSibling;


          if (filesCount === 1) {
            const fileName = files[0].name;
            textContainer.textContent = fileName;
          } else if (filesCount > 1 && filesCount < 5) {
            textContainer.textContent = `${filesCount} файлa добавлено`;
          } else {
            textContainer.textContent = `${filesCount} файлов добавлено`;
          }

          const maxSize = 3 * 1024 * 1024; // 3 MB
          const oversizedFiles = Array.from(files).filter(function (file) {
            return file.size > maxSize;
          });

          if (oversizedFiles.length > 0) {
            alert('максимум 3 MB:\n\n' + oversizedFiles.map(function (file) { return file.name }).join('\n'));
            this.value = '';
            textContainer.innerHTML = 'Перетащите сюда или <span class="file-msg-blue">загрузите файлы</span> doc, .docx, .rtf, .pdf, .odt, .jpg, .png менее 3 mb';
          }
        }
      });
    });
  }

  //
  if (document.querySelector('.services-slider')) {
    var servicesSwiper = null;

    function initSwiper() {
      servicesSwiper = new Swiper('.swiper.services-slider', {
        slidesPerView: 3,
        spaceBetween: 16,
        scrollbar: {
          el: '.services-slider .swiper-scrollbar',
          hide: false,
          draggable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 16
          },
          568: {
            slidesPerView: 2,
            spaceBetween: 16
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 16
          }
        }
      });
    }

    function destroySwiper() {
      if (servicesSwiper != null) {
        servicesSwiper.destroy();
        servicesSwiper = null;
      }
    }

    if (window.innerWidth < 960) {
      initSwiper();
    } else {
      destroySwiper();
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth < 960) {
        if (!servicesSwiper) {
          initSwiper();
        }
      } else {
        destroySwiper();
      }
    });
  }

  //paralax
  try {
    if (window.innerWidth > 1023) {
      var parallaxElements = document.querySelectorAll('.parallax-element');
      var mouseX = 0;
      var mouseY = 0;

      document.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
      });

      function animate() {
        requestAnimationFrame(animate);
        parallaxElements.forEach(function (element) {
          var ratio = 0.04;
          var offsetX = (mouseX - window.innerWidth / 2) * ratio;
          var offsetY = (mouseY - window.innerHeight / 2) * ratio;
          element.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px)';
        });
      }

      animate();
    }
  } catch (error) {
    console.error(error);
  }

  //select
  if (document.querySelector('.js-select')) {
    document.querySelectorAll('.js-select').forEach((el) => {
      let settings = {
        create: false,
        controlInput: null,
        allowEmptyOption: true,
      };
      if (el) {
        new TomSelect(el, settings);
      }
    });
  }

  //
  if (document.querySelector('.bill-form')) {
    const steps = document.querySelectorAll('.bill-steps__item');
    const tabs = document.querySelectorAll('.bill-tab');
    const nextBtn = document.querySelector('.bill-next');
    const backBtn = document.querySelector('.bill-navigation__back');
    const form = document.querySelector('.bill-form');

    let currentTab = 0;

    function showTab(n) {
      tabs.forEach(tab => {
        tab.classList.remove('is-active');
      });
      tabs[n].classList.add('is-active');

      steps[currentTab].classList.remove('is-active');
      steps[currentTab].classList.add('is-done');
      steps[n].classList.add('is-active');

      if (n === tabs.length - 1) {
        form.classList.add('last-step');
      } else {
        form.classList.remove('last-step');
      }

      if (n === 0) {
        backBtn.classList.add('is-disabled');
      } else {
        backBtn.classList.remove('is-disabled');
      }

      currentTab = n;
    }

    showTab(currentTab);

    nextBtn.addEventListener('click', () => {
      showTab(currentTab + 1);
    });

    backBtn.addEventListener('click', () => {
      showTab(currentTab - 1);
    });
  }


  //datepicker-single
  if (document.querySelector('.datepicker-single')) {
    (function () {
      Datepicker.locales.ru = {
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня",
        clear: "Очистить",
        format: "dd.mm.yyyy",
        weekStart: 1,
        monthsTitle: 'Месяцы'
      };
    }());

    const singleDatepickers = document.querySelectorAll('.datepicker-single');
    for (const singleDatepicker of singleDatepickers) {

      const singlepicker = new Datepicker(singleDatepicker, {
        format: 'dd.mm.yy',
        autohide: false,
        language: 'ru',
      });
    }
  }

  // modal
  document.querySelectorAll('.modal-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const modalTarget = this.getAttribute("data-target");
      modalsClose();
      document.body.classList.add('modalOpen');
      document.getElementById(modalTarget).classList.add('modal--active');
    });
  });


  function modalsClose() {
    if (document.querySelector('.modal--active .call-back')) {
      document.querySelector('.modal--active .call-back').classList.remove('call-back--active');
    }
    
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('modal--active');
      document.body.classList.remove('modalOpen');
    });
  }

  document.querySelectorAll('.modal__close').forEach(close => {
    close.addEventListener('click', function () {
      locoScroll.start();
      modalsClose();
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', modalsClose);

    modal.querySelector('.modal__inner').addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });


  //hover news
  if (document.querySelector('.news-list__link') || window.innerWidth > 1023) {
    const newsLinks = document.querySelectorAll('.news-list__link');

    newsLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const imgId = link.dataset.img;
        const activeImg = document.querySelector(`#${imgId}`);
        const allImgs = document.querySelectorAll('.news-main__img');

        allImgs.forEach(img => {
          img.classList.remove('is-active');
        });

        newsLinks.forEach(el => {
          el.classList.remove('is-active');
        });

        activeImg.classList.add('is-active');
        link.classList.add('is-active');
      });
    });
  }

  //priorities-slider
  if (document.querySelector('.priorities-text')) {
    const prioritiesThumb = new Swiper('.priorities-text.swiper', {
      slidesPerView: 1,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      loop: true,
      effect: 'fade',
      speed: 800,
      allowTouchMove: false,
    });

    const prioritiesFull = new Swiper('.priorities-main.swiper', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      speed: 800,
      thumbs: {
        swiper: prioritiesThumb,
      },
      scrollbar: {
        el: ".priorities-main .swiper-scrollbar",
        hide: false,
        draggable: true,

      },
    });
  }

  // history
  if (window.innerWidth < 768 || document.querySelector('.history-year-slider')) {
    var yearInnerSwiper = new Swiper('.history-slider.swiper', {
      slidesPerView: 1,
      speed: 800,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
    });
    var yearSwiper = new Swiper('.history-year-slider.swiper', {
      slidesPerView: 1,
      speed: 800,
      thumbs: {
        swiper: yearInnerSwiper,
      },
    });
  }

  if (window.innerWidth > 767 || document.querySelector('.history-year-slider')) {
    var yearSwiper = new Swiper('.history-year-slider', {
      slidesPerView: 1,
      speed: 300,
      breakpoints: {
        768: {
          direction: 'vertical',
          slidesPerView: 1,
          spaceBetween: 30,
        }
      }
    });
    
    if (window.innerWidth > 767) {
      var scrollTriggers = document.querySelectorAll('.scroll-trigger');
      setTimeout(() => {
        scrollTriggers.forEach(item => {
          gsap.to(item, {
            scrollTrigger: {
              scroll: scrollContainer,
              trigger: item,
              start: "top center",
              end: "bottom 80%",
              onEnter: () => {
                let targetSlide = item.getAttribute('data-slide');
                yearSwiper.slideTo(targetSlide - 1);
              },
              onEnterBack: () => {
                let targetSlide = item.getAttribute('data-slide');
                yearSwiper.slideTo(targetSlide - 1);
              }
            },
          });
        });
      }, 100);
    }
  }

  //anchor
  if (document.querySelector('.anchor-link')) {
    const buttons = document.querySelectorAll('.anchor-link');

    buttons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const anchor = this.getAttribute('data-anchor');
        const element = document.getElementById(anchor);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
      });
    });
  }

  // phone mask
  Inputmask("+375 (99) 999-99-99").mask(document.querySelectorAll(".phone-mask"));

  // counUp
  if (document.querySelector('.counter-animate')) {
    function initCounter() {
      const counters = document.querySelectorAll('.counter-animate');
      counters.forEach(counter => {
        gsap.from(counter,{
          textContent: "0",
          duration: 2,
          ease: "power1.inOut",
          modifiers: {
            textContent: value => formatNumber(value)
          },
          scrollTrigger: {
            scroller: scrollContainer,
            trigger: ".achievements-section",
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
        
      });
    }

    function formatNumber(value) {
      let integerValue = Math.floor(value);
      return integerValue.toLocaleString('en-US').replace(/,/g, ' ');
    }
    setTimeout(() => {
      initCounter();
    }, 300);
  }

	//header
  function initShowHideHeader() {

    const header = document.querySelector('.header');
  
    const showHeaderAnim = gsap.from(header, { 
      yPercent: -100,
      paused: true,
      duration: 0.3
    }).progress(1);
  
    ScrollTrigger.create({
      scroller: scrollContainer,
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showHeaderAnim.play() : showHeaderAnim.reverse();
      }
    });
  }

  //tabs
  if (document.querySelector('.tab-wrap')) {
    window.addEventListener('click', function (event) {
      if (event.target.closest('.tab-btn')) {
        event.preventDefault();

        const tabBtn = event.target.closest('.tab-btn');

        let tabCont = tabBtn.closest(".tab-wrap");
        let tabPanes = tabCont.querySelectorAll(".tab-pane");
        let tabNavs = tabCont.querySelectorAll(".tab-btn");

        let activeTabAttr = tabBtn.getAttribute("data-tab");

        for (var j = 0; j < tabNavs.length; j++) {
          let contentAttr = tabPanes[j].getAttribute("data-tab-content");

          if (activeTabAttr === contentAttr) {
            tabBtn.classList.add("is-active");
            tabPanes[j].classList.add("is-active");
            if (document.querySelector('.partners__item')) {
              partnersAnimate();
            }
          } else {
            tabNavs[j].classList.remove("is-active");
            tabPanes[j].classList.remove("is-active");
          }
        };
      }
    });
  }

  //partners
  function partnersAnimate() {
    const advantagesItems = document.querySelectorAll('.partners__item');
  
    advantagesItems.forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          scroll: scrollContainer,
          start: "top 90%",
        },
        x: 100,
        opacity: 0,
        duration: .6,
        ease: "Expo.easeOut",
      });
    });
  }

  //block animation
  setTimeout(() => {
    initScroll();
  }, 10);
  setTimeout(() => {

    initShowHideHeader();

    if (document.querySelector(".services-intro")) {
      const container = document.querySelector(".services-intro");
      const scrollbar = document.querySelector('.services-intro-scrollbar');
      const handler = document.querySelector('.services-intro-scrollbar__handler');
      const scrollbarLength = scrollbar.offsetWidth - handler.offsetWidth;
  
      let teamWrap = document.querySelector(".services-intro");
      let teamWrapWidth = teamWrap.scrollWidth;
      let backPadding = 300;
      let teamWrapWidthOffset = teamWrapWidth - window.innerWidth;
  
      if (window.innerWidth < 1200) backPadding = 100
  
      let trigger = gsap.to(container, {
        scrollTrigger: {
          scrub: true,
          trigger: ".services-intro-section",
          pin: ".services-intro-section",
          scroll: scrollContainer,
          start: "top top",
          end: () => "+=" + (teamWrapWidth + backPadding) / 1.5,
          onUpdate: self => updateHandler(self.progress)
        },
        x: - (teamWrapWidthOffset + backPadding),
        ease: "none"
      });
  
      let draggable = Draggable.create(handler, {
        type: "x",
        bounds: ".services-intro-scrollbar",
        onDrag: function () {
          const section = trigger.scrollTrigger;
          const range = gsap.utils.mapRange(this.minX, this.maxX, section.start, section.end, this.x);
          section.scroll(range);
        }
      });
  
      function updateHandler(progress) {
        const range = gsap.utils.mapRange(0, 1, 0, scrollbarLength, progress);
        gsap.set(handler, { x: range });
      }
    }
    if (document.querySelector(".history-wrapper") && window.innerWidth > 767) {
      gsap.to('.history-year', {
        scrollTrigger: {
          scroll: scrollContainer,
          scrub: true,
          trigger: ".history-wrapper",
          pin: ".history-year",
          start: "top center",
          end: "bottom 80%",
        },
        ease: "none"
      });
    }
    if (document.querySelector(".news__left") && window.innerWidth > 767) {
      gsap.to('.news__left', {
        scrollTrigger: {
          scroll: scrollContainer,
          scrub: true,
          trigger: ".news",
          pin: ".news__left",
          start: "top 15%",
          end: "bottom 80%",
        },
        ease: "none"
      });
    }

    if(document.querySelector('.fade-left')) {
      const itemsLeft = document.querySelectorAll('.fade-left');
      itemsLeft.forEach(element => {
        let delayValue = element.getAttribute("data-delay") || 0;
        
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            scroll: scrollContainer,
            start: "top 80%",
          },
          x: 150,
          opacity: 0,
          duration: .6,
          ease: "Power0.easeIn",
          delay: delayValue
        });
      });
    }

    if(document.querySelector('.fade-right')) {
      const itemsLeft = document.querySelectorAll('.fade-right');
      itemsLeft.forEach(element => {
        let delayValue = element.getAttribute("data-delay") || 0;
        
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            scroll: scrollContainer,
            start: "top 80%",
          },
          x: -150,
          opacity: 0,
          duration: .6,
          ease: "Power0.easeIn",
          delay: delayValue
        });
      });
    }
    if (document.querySelector('.advantages-grid')) {
      const advantagesItems = document.querySelectorAll('.advantages-item');
    
      advantagesItems.forEach((element, index) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            scroll: scrollContainer,
            start: "top 95%",
            end: "bottom 60%",
            scrub: true,
          },
          x: index % 2 === 0 ? -150 : 150,
          opacity: 0,
        });
      });
    }
    if (document.querySelector('.about-media__img')) {
      const advantagesItems = document.querySelectorAll('.about-media__img img');
    
      advantagesItems.forEach((element) => {
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            scroll: scrollContainer,
            start: "top 95%",
            end: "bottom 80%",
            scrub: 0.5,
          },
          scale: 1,

        });
      });
    }
    if (document.querySelector('.partners__item')) {
      partnersAnimate();
    }
    if (document.querySelector('.leadership__title')) {
      const advantagesItems = document.querySelectorAll('.leadership__title');
    
      advantagesItems.forEach((element) => {

        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            scroll: scrollContainer,
            start: "top 80%",
            toggleClass: 'fade-in',
          }
        });
      });
    }
    if (document.querySelector('.news-list__item')) {
      const advantagesItems = document.querySelectorAll('.news-list__item');
    
      advantagesItems.forEach((element) => {

        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            scroll: scrollContainer,
            start: "top 80%",
            toggleClass: 'animated',
          }
        });
      });
    }
    if (document.querySelector('.welcome__logo')) {
      const welcomeLogo = document.querySelectorAll('.welcome__logo');
    
      welcomeLogo.forEach((element) => {

        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            scroll: scrollContainer,
            start: "top 80%",
          },
          delay: 0.3,
          opacity: 1,
          scale: 1,
          ease: Power0.easeIn,
        });
      });
    }
  
    if(document.querySelector('.map__img')) {
      let mapTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.map__img',
          scroll: scrollContainer,
          start: "top 80%",
        },
      });
      mapTl
        .from('.map__img', {opacity: 0, x: 150, duration: 0.7})
        .from('.map-dot-1', {opacity: 0, scale: 0, duration: 0.3})
        .from('.map-dot-2', {opacity: 0, scale: 0, duration: 0.3})
        .from('.map-dot-3', {opacity: 0, scale: 0, duration: 0.3}, "-=0.8")
        .from('.map-dot-4', {opacity: 0, scale: 0, duration: 0.3}, "-=0.6")
        .from('.map-dot-5', {opacity: 0, scale: 0, duration: 0.3})
    }
  }, 100);
});
