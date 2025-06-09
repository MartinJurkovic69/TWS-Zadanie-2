// Menu toggle for mobile
$(document).ready(function() {
    // Mobile menu toggle
    $('.menu-toggle').click(function() {
        $('.main-nav ul').toggleClass('active');
        $(this).find('i').toggleClass('fa-times fa-bars');
    });
    
    // Close menu when clicking on a link
    $('.main-nav a').click(function() {
        if ($(window).width() <= 768) {
            $('.main-nav ul').removeClass('active');
            $('.menu-toggle i').removeClass('fa-times').addClass('fa-bars');
        }
    });
    
    // Testimonial slider
    let currentSlide = 0;
    const slides = $('.slide');
    const dots = $('.dot');
    
    function showSlide(n) {
        slides.removeClass('active');
        dots.removeClass('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides.eq(currentSlide).addClass('active');
        dots.eq(currentSlide).addClass('active');
    }
    
    $('.slider-next').click(function() {
        showSlide(currentSlide + 1);
    });
    
    $('.slider-prev').click(function() {
        showSlide(currentSlide - 1);
    });
    
    dots.click(function() {
        showSlide($(this).index());
    });
    
    // Auto slide change every 5 seconds
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Gallery filter
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.gallery-item').fadeIn(300);
        } else {
            $('.gallery-item').each(function() {
                if ($(this).hasClass(filter)) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    });
    
 // Lightbox functionality
let currentImageIndex = 0;
const galleryItems = $('.gallery-item');
const lightbox = $('.lightbox');
const lightboxImg = $('.lightbox-img');
const lightboxCaption = $('.lightbox-caption h3');
const lightboxDesc = $('.lightbox-caption p');

// Show image in lightbox
function showLightboxImage(index) {
    const item = galleryItems.eq(index);
    const imgSrc = item.find('.view-btn').data('full');
    const imgTitle = item.find('h3').text();
    
    lightboxImg.attr('src', imgSrc);
    lightboxCaption.text(imgTitle);
}

// Open lightbox
$('.view-btn').click(function(e) {
    e.preventDefault();
    currentImageIndex = $(this).closest('.gallery-item').index();
    showLightboxImage(currentImageIndex);
    lightbox.fadeIn();
});

// Close lightbox
$('.lightbox-close, .lightbox').click(function(e) {
    if ($(e.target).hasClass('lightbox') || $(e.target).hasClass('lightbox-close')) {
        lightbox.fadeOut();
    }
});

// Navigation
$('.lightbox-prev').click(function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    showLightboxImage(currentImageIndex);
});

$('.lightbox-next').click(function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    showLightboxImage(currentImageIndex);
});

// Keyboard navigation
$(document).keydown(function(e) {
    if (lightbox.is(':visible')) {
        e.preventDefault();
        if (e.keyCode === 37) { // Left arrow
            $('.lightbox-prev').click();
        } else if (e.keyCode === 39) { // Right arrow
            $('.lightbox-next').click();
        } else if (e.keyCode === 27) { // Escape
            lightbox.fadeOut();
        }
    }
});
    
    // Contact form validation
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        const name = $('#name').val().trim();
        if (name.length < 5 || name.length > 128) {
            $('#name-error').text('Meno musí mať 5 až 128 znakov');
            isValid = false;
        } else {
            $('#name-error').text('');
        }
        
        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || email.length > 256) {
            $('#email-error').text('Zadajte platnú emailovú adresu (max. 256 znakov)');
            isValid = false;
        } else {
            $('#email-error').text('');
        }
        
        // Validate phone (optional)
        const phone = $('#phone').val().trim();
        if (phone && phone.length < 7) {
            $('#phone-error').text('Telefónne číslo musí mať aspoň 7 znakov');
            isValid = false;
        } else {
            $('#phone-error').text('');
        }
        
        // Validate subject
        const subject = $('#subject').val().trim();
        if (subject.length < 3 || subject.length > 128) {
            $('#subject-error').text('Predmet musí mať 3 až 128 znakov');
            isValid = false;
        } else {
            $('#subject-error').text('');
        }
        
        // Validate message
        const message = $('#message').val().trim();
        if (message.length < 5) {
            $('#message-error').text('Správa musí mať aspoň 5 znakov');
            isValid = false;
        } else {
            $('#message-error').text('');
        }
        
        if (isValid) {
            // Here you would typically send the form data to the server
            // For demo purposes, we'll just show a success message
            $('#contactForm').hide();
            $('#form-success').fadeIn();
            
            // Reset form after 5 seconds
            setTimeout(function() {
                $('#contactForm').trigger('reset').fadeIn();
                $('#form-success').fadeOut();
            }, 5000);
        }
    });
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        }
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoadInstance = new LazyLoad({
            elements_selector: 'img[loading="lazy"]'
        });
    }
});