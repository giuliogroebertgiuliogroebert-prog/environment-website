document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Navbar Scroll Effect
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled', 'py-2');
                nav.classList.remove('py-4', 'bg-transparent');
                
                // Adjust text colors for dark intros
                document.querySelectorAll('.nav-text-adapt').forEach(el => {
                    el.classList.remove('text-white');
                    el.classList.add('text-gray-800');
                });
            } else {
                nav.classList.remove('nav-scrolled', 'py-2');
                nav.classList.add('py-4', 'bg-transparent');
                
                // Keep text white at top for transparent navs on dark banners
                if (nav.classList.contains('absolute')) {
                    document.querySelectorAll('.nav-text-adapt').forEach(el => {
                        el.classList.add('text-white');
                        el.classList.remove('text-gray-800');
                    });
                }
            }
        });
    }

    // Scroll Animation (Intersection Observer)
    const faders = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Active Nav Links
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('text-eco-500', 'font-semibold');
            // Don't remove white if we are at top
        }
    });

    // Form submit prevention for contact page
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Message Sent!';
                btn.classList.remove('bg-eco-600', 'hover:bg-eco-700');
                btn.classList.add('bg-green-600');
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.add('bg-eco-600', 'hover:bg-eco-700');
                    btn.classList.remove('bg-green-600');
                }, 3000);
            }, 1500);
        });
    }
});
