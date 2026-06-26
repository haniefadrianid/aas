/**
 * ANTAPRO BHARATA - Landing Page JavaScript
 * Version: 1.0.0
 * Optimized for Performance & Core Web Vitals
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ========================================
    // 1. STICKY HEADER
    // ========================================
    var header = document.getElementById('stickyHeader');
    var hero = document.querySelector('.hero');
    
    if (header && hero) {
        var heroHeight = hero.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > heroHeight - 100) {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }
        });
    }
    
    // ========================================
    // 2. FAQ ACCORDION
    // ========================================
    var faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                var isActive = item.classList.contains('active');
                
                // Close other FAQ items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.setAttribute('aria-expanded', 'true');
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    question.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
    
    // ========================================
    // 3. SMOOTH SCROLLING
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var hash = this.getAttribute('href');
            if (hash.length > 1) {
                var target = document.querySelector(hash);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // 4. INTERSECTION OBSERVER (Scroll Animations)
    // ========================================
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    var animateElements = document.querySelectorAll('.section, .pain-card, .usp-card, .benefit-item, .step-card, .composition-card, .testimonial-card');
    
    // Add initial animation styles
    animateElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Create CSS for visible state if not exists
    var styleSheet = document.createElement('style');
    styleSheet.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(styleSheet);
    
    // ========================================
    // 5. PERFORMANCE MONITORING
    // ========================================
    var performanceData = {
        lcp: 0,
        cls: 0,
        inp: 0
    };
    
    // Log page load time
    var loadStart = performance.now();
    
    window.addEventListener('load', function() {
        var loadTime = performance.now() - loadStart;
        console.log('Page loaded in: ' + loadTime.toFixed(2) + 'ms');
        
        // Monitor LCP
        new PerformanceObserver(function(list) {
            var entries = list.getEntries();
            var lastEntry = entries[entries.length - 1];
            performanceData.lcp = lastEntry.startTime;
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
    
    // Monitor CLS
    var clsValue = 0;
    new PerformanceObserver(function(list) {
        for (var entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
            }
        }
        performanceData.cls = clsValue;
        console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
    
    // ========================================
    // 6. WHATSAPP CLICK TRACKING
    // ========================================
    var waLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    waLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Log to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': this.getAttribute('href')
                });
            }
            
            // Optional: track in custom events
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'whatsapp_click',
                    'event_category': 'engagement',
                    'event_label': this.getAttribute('href')
                });
            }
        });
    });
    
    // ========================================
    // 7. FORM VALIDATION (if any)
    // ========================================
    // No forms on this landing page - direct WhatsApp conversion
    // If you add forms later, implement validation here
    
    // ========================================
    // 8. ERROR HANDLING
    // ========================================
    window.addEventListener('error', function(e) {
        console.error('Error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno
        });
    });
});

// Preload critical resources
if ('relList' in document.createElement('link')) {
    var preloadLinks = [
        { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
        { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: 'anonymous' }
    ];
    
    preloadLinks.forEach(function(link) {
        var linkEl = document.createElement('link');
        linkEl.rel = link.rel;
        linkEl.href = link.href;
        if (link.crossorigin) {
            linkEl.crossOrigin = link.crossorigin;
        }
        document.head.appendChild(linkEl);
    });
}

// ========================================
// EXPORT FOR TESTING
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init: function() {
            document.dispatchEvent(new Event('DOMContentLoaded'));
        }
    };
}
