
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                display: ['"Archivo Black"', 'sans-serif'],
                sans: ['"Space Grotesk"', 'sans-serif'],
                mono: ['"Space Mono"', 'monospace'],
            },
            colors: {
                'neo-bg': '#f0f0f0',
                'neo-black': '#000000',
                'neo-white': '#ffffff',
                'neo-yellow': '#FFDE00',
                'neo-pink': '#FF5D8F',
                'neo-green': '#00F5D4',
                'neo-blue': '#3A86FF',
                'neo-purple': '#9D4EDD',
                'neo-red': '#FF0054',
            },
            boxShadow: {
                'neo': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
                'neo-lg': '10px 10px 0px 0px rgba(0, 0, 0, 1)',
                'neo-sm': '3px 3px 0px 0px rgba(0, 0, 0, 1)',
            },
            borderWidth: {
                '3': '3px',
                '4': '4px',
                '5': '5px',
            },
            animation: {
                'enter-up': 'enterUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                enterUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loginOverlay = document.getElementById('login-overlay');
    const loginCard = document.getElementById('login-card');
    const loginContent = document.getElementById('login-content');
    const loadingAnimation = document.getElementById('loading-animation');
    const portfolioView = document.getElementById('portfolio-view');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const passwordInput = document.getElementById('password');
    const passwordToggleBtn = document.getElementById('password-toggle-btn');
    const eyeIcon = document.getElementById('eye-icon');
    const logoutButton = document.getElementById('logout-button');

    const heroImageContainer = document.getElementById('hero-image-container');
    const heroImageInput = document.getElementById('hero-image-input');
    const heroImageDisplay = document.getElementById('hero-image-display');
    const uploadPrompt = document.getElementById('upload-prompt');

    const CORRECT_USERNAME_B64 = 'cmFjaGl0IGt1bWFyIG1vaGFudHk=';
    const CORRECT_PASSWORD_B64 = 'bG9wYS0yNA==';

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    passwordToggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        if(isPassword) {
            eyeIcon.classList.remove('ph-eye');
            eyeIcon.classList.add('ph-eye-slash');
        } else {
            eyeIcon.classList.remove('ph-eye-slash');
            eyeIcon.classList.add('ph-eye');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim().toLowerCase();
        const password = document.getElementById('password').value.trim();

        if (btoa(username) === CORRECT_USERNAME_B64 && btoa(password) === CORRECT_PASSWORD_B64) {
            // Success UI - Smooth Transition
            errorMessage.textContent = '';
            loginContent.classList.add('hidden');
            loadingAnimation.classList.remove('hidden');
            loginCard.style.transform = "scale(1.05)"; 

            setTimeout(() => {
                loginOverlay.style.opacity = '0';
                loginOverlay.style.pointerEvents = 'none'; 
                
                portfolioView.classList.remove('hidden');
                // Trigger reflow for transition
                void portfolioView.offsetWidth; 
                portfolioView.style.opacity = '1';
                
                window.scrollTo(0, 0);

                setTimeout(() => {
                    loginOverlay.style.display = 'none';
                }, 500);

            }, 2000);
        } else {
            errorMessage.textContent = 'ACCESS DENIED';
            loginForm.parentElement.classList.add('animate-[shake_0.4s_ease-in-out]');
            setTimeout(() => loginForm.parentElement.classList.remove('animate-[shake_0.4s_ease-in-out]'), 400);
        }
    });

  
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        portfolioView.style.opacity = '0';
        
        setTimeout(() => {
            portfolioView.classList.add('hidden');
           
            loginOverlay.style.display = 'flex';
            void loginOverlay.offsetWidth;
            loginOverlay.style.opacity = '1';
            loginOverlay.style.pointerEvents = 'auto';
            
            loadingAnimation.classList.add('hidden');
            loginContent.classList.remove('hidden');
        
            loginCard.style.transform = "";

            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            errorMessage.textContent = '';
        }, 500);
    });

    heroImageContainer.addEventListener('click', () => {
        heroImageInput.click();
    });

    heroImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                heroImageDisplay.src = e.target.result;
                heroImageDisplay.classList.remove('hidden');
                
                uploadPrompt.className = "absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 text-white";
                uploadPrompt.innerHTML = `
                    <i class="ph-bold ph-arrows-clockwise text-4xl mb-2"></i>
                    <span class="font-display text-sm uppercase">Change</span>
                `;
            }
            reader.readAsDataURL(file);
        }
    });
});