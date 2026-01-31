
// Results 区域轮播功能 (第一个 applications section)
let currentApplication = 0;
let applicationSlides = null;
let applicationIndicators = null;


// 1. 初始化变量
const analysisSlides = document.querySelectorAll('.analysis-slide');
const analysisIndicators = document.querySelectorAll('.analysis-carousel .indicator'); // 修正选择器
let currentAnalysis = 0;

// 2. 切换函数 (核心修改：添加了 resizeAndPlay 调用)
function changeAnalysis(direction) {
    if (analysisSlides.length === 0) return;

    // 移除当前状态
    analysisSlides[currentAnalysis].classList.remove('active');
    if (analysisIndicators[currentAnalysis]) {
        analysisIndicators[currentAnalysis].classList.remove('active');
    }
    
    // 计算新索引
    currentAnalysis += direction;
    if (currentAnalysis >= analysisSlides.length) {
        currentAnalysis = 0;
    } else if (currentAnalysis < 0) {
        currentAnalysis = analysisSlides.length - 1;
    }
    
    // 激活新状态
    const nextSlide = analysisSlides[currentAnalysis];
    nextSlide.classList.add('active');
    if (analysisIndicators[currentAnalysis]) {
        analysisIndicators[currentAnalysis].classList.add('active');
    }

    // 【关键修复】唤醒新 Slide 里的 Canvas
    const video = nextSlide.querySelector('video');
    if (video) {
        // 强制重绘，解决 display: none 导致的宽高达0问题
        resizeAndPlay(video); 
    }
}

// 3. 点击圆点切换
function setAnalysis(index) {
    if (analysisSlides.length === 0 || index === currentAnalysis) return;

    // 移除旧的
    analysisSlides[currentAnalysis].classList.remove('active');
    if (analysisIndicators[currentAnalysis]) {
        analysisIndicators[currentAnalysis].classList.remove('active');
    }
    
    // 更新索引
    currentAnalysis = index;
    
    // 激活新的
    const nextSlide = analysisSlides[currentAnalysis];
    nextSlide.classList.add('active');
    if (analysisIndicators[currentAnalysis]) {
        analysisIndicators[currentAnalysis].classList.add('active');
    }

    // 【关键修复】唤醒
    const video = nextSlide.querySelector('video');
    if (video) {
        resizeAndPlay(video);
    }
}

// 初始化 Results 轮播功能
function initApplications() {
    applicationSlides = document.querySelectorAll('.applications:not(.abilities-tabs) .application-slide');
    applicationIndicators = document.querySelectorAll('.applications:not(.abilities-tabs) .indicator');
    console.log('Applications 初始化:', applicationSlides.length, 'slides,', applicationIndicators.length, 'indicators');
}

function changeApplication(direction) {
    if (!applicationSlides || applicationSlides.length === 0) return;
    
    applicationSlides[currentApplication].classList.remove('active');
    applicationIndicators[currentApplication].classList.remove('active');
    
    currentApplication += direction;
    
    if (currentApplication >= applicationSlides.length) {
        currentApplication = 0;
    } else if (currentApplication < 0) {
        currentApplication = applicationSlides.length - 1;
    }
    
    applicationSlides[currentApplication].classList.add('active');
    applicationIndicators[currentApplication].classList.add('active');
}

function setApplication(index) {
    if (!applicationSlides || applicationSlides.length === 0) return;
    
    applicationSlides[currentApplication].classList.remove('active');
    applicationIndicators[currentApplication].classList.remove('active');
    
    currentApplication = index;
    
    applicationSlides[currentApplication].classList.add('active');
    applicationIndicators[currentApplication].classList.add('active');
}

// Blind spot input/output carousel (Result Item 2)
let currentBlindspotCase = 0;
let blindspotSlides = null;
let blindspotIndicators = null;

function initBlindspotCarousel() {
    blindspotSlides = document.querySelectorAll('.blindspot-carousel .application-slide');
    blindspotIndicators = document.querySelectorAll('.blindspot-carousel .indicator');
    console.log('Blindspot carousel 初始化:', blindspotSlides.length, 'slides,', blindspotIndicators.length, 'indicators');
}

function changeBlindspotCase(direction) {
    if (!blindspotSlides || blindspotSlides.length === 0) return;

    if (blindspotSlides[currentBlindspotCase]) {
        blindspotSlides[currentBlindspotCase].classList.remove('active');
    }
    if (blindspotIndicators[currentBlindspotCase]) {
        blindspotIndicators[currentBlindspotCase].classList.remove('active');
    }

    currentBlindspotCase += direction;
    if (currentBlindspotCase >= blindspotSlides.length) {
        currentBlindspotCase = 0;
    } else if (currentBlindspotCase < 0) {
        currentBlindspotCase = blindspotSlides.length - 1;
    }

    const nextSlide = blindspotSlides[currentBlindspotCase];
    if (nextSlide) {
        nextSlide.classList.add('active');
    }
    if (blindspotIndicators[currentBlindspotCase]) {
        blindspotIndicators[currentBlindspotCase].classList.add('active');
    }

    // 确保切换后重新初始化当前 case 的竖直拖动条交互
    const comparisonVideo = nextSlide ? nextSlide.querySelector('video.video') : null;
    if (comparisonVideo && typeof resizeAndPlay === 'function') {
        try {
            resizeAndPlay(comparisonVideo);
        } catch (e) {
            console.error('resizeAndPlay in changeBlindspotCase 失败:', e);
        }
    }
}

function setBlindspotCase(index) {
    if (!blindspotSlides || blindspotSlides.length === 0) return;
    if (index === currentBlindspotCase) return;

    if (blindspotSlides[currentBlindspotCase]) {
        blindspotSlides[currentBlindspotCase].classList.remove('active');
    }
    if (blindspotIndicators[currentBlindspotCase]) {
        blindspotIndicators[currentBlindspotCase].classList.remove('active');
    }

    currentBlindspotCase = index;

    const nextSlide = blindspotSlides[currentBlindspotCase];
    if (nextSlide) {
        nextSlide.classList.add('active');
    }
    if (blindspotIndicators[currentBlindspotCase]) {
        blindspotIndicators[currentBlindspotCase].classList.add('active');
    }

    const comparisonVideo = nextSlide ? nextSlide.querySelector('video.video') : null;
    if (comparisonVideo && typeof resizeAndPlay === 'function') {
        try {
            resizeAndPlay(comparisonVideo);
        } catch (e) {
            console.error('resizeAndPlay in setBlindspotCase 失败:', e);
        }
    }
}

// Abilities 区域按钮切换功能 (abilities-tabs section)
let currentAbility = 0;
let abilitySlides = null;
let abilityButtons = null;

// 初始化 Abilities 切换功能
function initAbilities() {
    abilitySlides = document.querySelectorAll('.abilities-tabs .application-slide');
    abilityButtons = document.querySelectorAll('.abilities-tabs .indicator');
    console.log('Abilities 初始化:', abilitySlides.length, 'slides,', abilityButtons.length, 'buttons');
}

// 显式定义为全局函数
window.setAbility = function(index) {
    // 如果还没初始化，先初始化
    if (!abilitySlides || !abilityButtons) {
        initAbilities();
    }
    
    // 检查元素是否存在
    if (!abilitySlides || abilitySlides.length === 0) {
        console.error('找不到 ability slides 元素');
        return;
    }
    
    if (!abilityButtons || abilityButtons.length === 0) {
        console.error('找不到 ability buttons 元素');
        return;
    }
    
    console.log('切换 ability:', currentAbility, '->', index);
    
    // 移除当前 active
    if (abilitySlides[currentAbility]) {
        abilitySlides[currentAbility].classList.remove('active');
    }
    if (abilityButtons[currentAbility]) {
        abilityButtons[currentAbility].classList.remove('active');
    }
    
    // 更新索引
    currentAbility = index;
    
    // 添加新的 active
    if (abilitySlides[currentAbility]) {
        abilitySlides[currentAbility].classList.add('active');
    }
    if (abilityButtons[currentAbility]) {
        abilityButtons[currentAbility].classList.add('active');
    }
};

// 页面加载完成后初始化所有轮播功能
function initAllCarousels() {
    console.log('开始初始化所有轮播...');
    initApplications();
    initAbilities();
    initBlindspotCarousel();
    console.log('所有轮播初始化完成');
    console.log('setAbility 函数状态:', typeof window.setAbility);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
} else {
    initAllCarousels();
}

// 确认 script.js 已加载
console.log('script.js 已加载 - setAbility 已定义:', typeof window.setAbility);

// Smooth scroll navigation with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = 70;
            const extraPadding = 20;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - extraPadding;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Auto-carousel disabled
// Uncomment the code below to enable auto-carousel

// function startAutoCarousel() {
//     setInterval(() => {
//         changeApplication(1);
//     }, 5000);
// }

// let autoCarouselInterval;

// function pauseAutoCarousel() {
//     clearInterval(autoCarouselInterval);
// }

// function resumeAutoCarousel() {
//     autoCarouselInterval = setInterval(() => {
//         changeApplication(1);
//     }, 5000);
// }

// const applicationCarousel = document.querySelector('.applications-carousel');
// if (applicationCarousel) {
//     applicationCarousel.addEventListener('mouseenter', pauseAutoCarousel);
//     applicationCarousel.addEventListener('mouseleave', resumeAutoCarousel);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     setTimeout(() => {
//         resumeAutoCarousel();
//     }, 3000);
// });

// Enhanced video lazy loading and streaming functionality
function initVideoStreaming() {
    // Main video streaming with progress
    const mainVideo = document.getElementById('mainVideo');
    const mainVideoLoader = document.getElementById('mainVideoLoader');
    const mainVideoProgress = document.getElementById('mainVideoProgress');
    
    if (mainVideo && mainVideoLoader) {
        // Create Intersection Observer for lazy loading
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadVideoWithProgress(mainVideo, mainVideoLoader, mainVideoProgress);
                    videoObserver.unobserve(mainVideo);
                }
            });
        }, {
            rootMargin: '100px' // Start loading 100px before entering viewport
        });
        
        videoObserver.observe(mainVideo);
    }
    
    // Lazy load other videos
    lazyLoadVideos();
}

function loadVideoWithProgress(video, loader, progressBar) {
    const videoSrc = video.dataset.src;
    if (!videoSrc) return;
    
    // Show loader
    loader.classList.remove('hidden');
    
    // Create XMLHttpRequest to track loading progress
    const xhr = new XMLHttpRequest();
    xhr.open('GET', videoSrc, true);
    xhr.responseType = 'blob';
    
    // Track download progress
    xhr.onprogress = function(e) {
        if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            if (progressBar) {
                progressBar.style.width = percentComplete + '%';
            }
        }
    };
    
    // On load complete
    xhr.onload = function() {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const blobUrl = URL.createObjectURL(blob);
            
            // Set video source
            const source = video.querySelector('source');
            if (source) {
                source.src = blobUrl;
            }
            video.src = blobUrl;
            
            // Wait for video to be ready to play
            video.addEventListener('loadeddata', function() {
                // Hide loader
                setTimeout(() => {
                    loader.classList.add('hidden');
                    video.classList.add('loaded');
                }, 300);
                
                // Attempt autoplay
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        // Autoplay was prevented, user needs to interact
                        console.log('Autoplay prevented:', error);
                    });
                }
            });
            
            // Load video
            video.load();
        }
    };
    
    // Error handling
    xhr.onerror = function() {
        console.error('Video loading failed');
        loader.querySelector('.loader-text').textContent = 'Loading failed, please refresh';
        if (progressBar) {
            progressBar.style.background = '#ef4444';
            progressBar.style.width = '100%';
        }
    };
    
    // Send request
    xhr.send();
}

// Standard lazy loading for other videos
function lazyLoadVideos() {
    const videos = document.querySelectorAll('video.lazy-video:not(#mainVideo)');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                
                // Check if already loaded or loading
                if (video.dataset.isLoading === 'true' || video.dataset.isLoaded === 'true') {
                    console.log('Video already loading or loaded, skipping:', video.dataset.src);
                    return;
                }
                
                // Mark as loading
                video.dataset.isLoading = 'true';
                
                const source = video.querySelector('source[data-src]');
                
                // Find the loader element
                const loader = video.parentElement.querySelector('.video-loader');
                
                console.log('Starting to load video:', video.dataset.src);
                
                // Show loader
                if (loader) {
                    loader.classList.remove('hidden');
                }
                
                // Set up load event handler
                const onLoad = function() {
                    console.log('Video loaded successfully:', video.dataset.src);
                    video.dataset.isLoading = 'false';
                    video.dataset.isLoaded = 'true';
                    
                    setTimeout(() => {
                        if (loader) {
                            loader.classList.add('hidden');
                        }
                        video.classList.add('loaded');
                    }, 300);
                };
                
                const onError = function() {
                    console.error('Video failed to load:', video.dataset.src);
                    video.dataset.isLoading = 'false';
                    if (loader) {
                        loader.querySelector('.loader-text').textContent = 'Failed to load video';
                    }
                };
                
                video.addEventListener('loadeddata', onLoad, { once: true });
                video.addEventListener('error', onError, { once: true });
                
                // Set video sources
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    source.removeAttribute('data-src');
                }
                
                if (video.dataset.src) {
                    const videoSrc = video.dataset.src;
                    video.src = videoSrc;
                    video.removeAttribute('data-src');
                }
                
                video.load();
                
                // Stop observing this video
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

// Initialize video streaming on page load
document.addEventListener('DOMContentLoaded', initVideoStreaming);

// Switch iframe content for interactive examples
function switchIframe(element) {
    console.log('switchIframe called');
    
    // Get the iframe src from data attribute
    const newSrc = element.getAttribute('data-src');
    const mainIframe = document.getElementById('mainIframe');
    const iframeLoader = document.getElementById('iframeLoader');
    
    console.log('New src:', newSrc);
    console.log('Main iframe:', mainIframe);
    console.log('Loader:', iframeLoader);
    
    if (!mainIframe) {
        console.error('Main iframe not found!');
        return;
    }
    
    if (!newSrc) {
        console.error('No data-src attribute found!');
        return;
    }
    
    // Don't reload if it's the same src
    if (mainIframe.src === newSrc) {
        console.log('Same src, skipping reload');
        return;
    }
    
    console.log('Starting iframe switch...');
    
    // Show loader and hide iframe
    if (iframeLoader) {
        iframeLoader.classList.remove('hidden');
        iframeLoader.querySelector('.loader-text').textContent = 'Loading interactive demo...';
    }
    mainIframe.classList.remove('loaded');
    
    // Update active state on thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active', 'loading');
    });
    element.classList.add('active', 'loading');
    
    // Update iframe src
    console.log('Setting iframe src to:', newSrc);
    mainIframe.src = newSrc;
}

// Initialize iframe loading handlers
document.addEventListener('DOMContentLoaded', function() {
    const mainIframe = document.getElementById('mainIframe');
    const iframeLoader = document.getElementById('iframeLoader');
    
    if (mainIframe && iframeLoader) {
        console.log('Setting up iframe event listeners');
        
        // Handle iframe load event
        mainIframe.addEventListener('load', function() {
            console.log('Iframe loaded successfully');
            setTimeout(() => {
                iframeLoader.classList.add('hidden');
                mainIframe.classList.add('loaded');
                
                // Remove loading state from all thumbnails
                const thumbnails = document.querySelectorAll('.thumbnail-item');
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('loading');
                });
            }, 500);
        });
        
        // Handle iframe error event
        mainIframe.addEventListener('error', function() {
            console.error('Iframe failed to load');
            if (iframeLoader) {
                iframeLoader.querySelector('.loader-text').textContent = 'Failed to load. Please try again.';
            }
            
            // Remove loading state from all thumbnails
            const thumbnails = document.querySelectorAll('.thumbnail-item');
            thumbnails.forEach(thumb => {
                thumb.classList.remove('loading');
            });
        });
        
        // Initial load - show iframe after it loads
        console.log('Waiting for initial iframe load...');
    } else {
        console.error('Iframe or loader not found!', { mainIframe, iframeLoader });
    }
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.overview-card, .demo-item, .model-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // 左右箭头键控制轮播
    if (e.key === 'ArrowLeft') {
        changeApplication(-1);
        changeAnalysis(-1);
    } else if (e.key === 'ArrowRight') {
        changeApplication(1);
        changeAnalysis(1);
    }
});

// 触摸滑动支持（移动端）
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动，显示下一个
            changeApplication(1);
            changeAnalysis(1);
        } else {
            // 向右滑动，显示上一个
            changeApplication(-1);
            changeAnalysis(-1);
        }
    }
}




Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  
  function resizeAndPlay(element) {
    var cv = document.getElementById(element.id + "Merge");
    if (!cv) return; 
  
    cv.width = element.videoWidth / 2;
    cv.height = element.videoHeight;
    
    element.play();
    element.style.height = "0px";
    
    playVids(element.id);
  }
  
  function playVids(videoId) {
      var videoMerge = document.getElementById(videoId + "Merge");
      var vid = document.getElementById(videoId);
  
      var position = 0.5;
      var vidWidth = vid.videoWidth / 2;
      var vidHeight = vid.videoHeight;
  
      var mergeContext = videoMerge.getContext("2d");
  
      if (vid.readyState > 3) {
          vid.play();
  
          function trackLocation(e) {
              var bcr = videoMerge.getBoundingClientRect();
              position = ((e.pageX - bcr.x) / bcr.width);
          }
          function trackLocationTouch(e) {
              var bcr = videoMerge.getBoundingClientRect();
              position = ((e.touches[0].pageX - bcr.x) / bcr.width);
          }
  
          videoMerge.addEventListener("mousemove",  trackLocation, false); 
          videoMerge.addEventListener("touchstart", trackLocationTouch, false);
          videoMerge.addEventListener("touchmove",  trackLocationTouch, false);
  
          function drawLoop() {
               mergeContext.drawImage(vid, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
               var colStart = (vidWidth * position).clamp(0.0, vidWidth);
               var colWidth = (vidWidth - (vidWidth * position)).clamp(0.0, vidWidth);
               mergeContext.drawImage(vid, colStart+vidWidth, 0, colWidth, vidHeight, colStart, 0, colWidth, vidHeight);
               requestAnimationFrame(drawLoop);
  
               var arrowLength = 0.09 * vidHeight;
               var arrowheadWidth = 0.025 * vidHeight;
               var arrowheadLength = 0.04 * vidHeight;
               var arrowPosY = vidHeight / 10;
               var arrowWidth = 0.007 * vidHeight;
               var currX = vidWidth * position;
  
               mergeContext.beginPath();
               mergeContext.arc(currX, arrowPosY, arrowLength*0.7, 0, Math.PI * 2, false);
               mergeContext.fillStyle = "#FFD79340";
               mergeContext.fill();
  
               mergeContext.beginPath();
               mergeContext.moveTo(vidWidth*position, 0);
               mergeContext.lineTo(vidWidth*position, vidHeight);
               mergeContext.closePath();
               mergeContext.strokeStyle = "#AAAAAA";
               mergeContext.lineWidth = 4;
               mergeContext.stroke();
  
               // Draw arrow
               mergeContext.beginPath();
               mergeContext.moveTo(currX, arrowPosY - arrowWidth/2);
               mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY - arrowWidth/2);
               mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY - arrowheadWidth/2);
               mergeContext.lineTo(currX + arrowLength/2, arrowPosY);
               mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY + arrowheadWidth/2);
               mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY + arrowWidth/2);
               mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY + arrowWidth/2);
               mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY + arrowheadWidth/2);
               mergeContext.lineTo(currX - arrowLength/2, arrowPosY);
               mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY  - arrowheadWidth/2);
               mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY);
               mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY - arrowWidth/2);
               mergeContext.lineTo(currX, arrowPosY - arrowWidth/2);
               mergeContext.closePath();
               mergeContext.fillStyle = "#AAAAAA";
               mergeContext.fill();
          }
          requestAnimationFrame(drawLoop);
      } 
  }

// Comparison Image Gallery 
window.switchComparisonImage = function(element) {
    const imgSrc = element.getAttribute('data-img-src');
    const mainImg = document.getElementById('comparisonMainImg');
    
    if (!mainImg) {
        console.error('找不到主图元素 comparisonMainImg');
        return;
    }
    
    if (!imgSrc) {
        console.error('缩略图缺少 data-img-src 属性');
        return;
    }
    
    mainImg.src = imgSrc;
    
    const thumbnails = document.querySelectorAll('.comparison-thumbnail-gallery .thumbnail-item');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
    
    console.log('切换图片到:', imgSrc);
}
