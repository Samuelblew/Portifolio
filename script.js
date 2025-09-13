// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroButtons = document.querySelectorAll('.hero-buttons button');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero button actions
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Ver Projetos')) {
            document.querySelector('#projetos').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (button.textContent.includes('Sobre Mim')) {
            document.querySelector('#sobre').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator action
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#sobre').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .certificate-card, .course-card, .skill-item').forEach(el => {
    observer.observe(el);
});

// Certificate button actions removed to allow direct links

// Links para projetos funcionam diretamente agora
// document.querySelectorAll('.btn-project').forEach(button => {
//     button.addEventListener('click', (e) => {
//         e.preventDefault();
//         alert('Código do projeto disponível no GitHub!');
//     });
// });

// Form validation for contact (if form exists)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }
        
        alert('Mensagem enviada com sucesso! Retornarei em breve.');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Social links actions
document.querySelectorAll('.social-link, .social-icon').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        } else {
            alert('Link para rede social ainda não configurado!');
        }
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load - DISABLED
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 80);
//         }, 500);
//     }
// });

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'translateY(-5px)';
        skill.style.transition = 'transform 0.3s ease';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateY(0)';
    });
});

// Project cards interactive effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Contact information click to copy
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', () => {
        const text = item.textContent.trim();
        
        if (text.includes('@') || text.includes('+')) {
            navigator.clipboard.writeText(text).then(() => {
                // Create temporary feedback
                const feedback = document.createElement('span');
                feedback.textContent = ' (Copiado!)';
                feedback.style.color = '#28a745';
                feedback.style.fontSize = '12px';
                item.appendChild(feedback);
                
                setTimeout(() => {
                    feedback.remove();
                }, 2000);
            }).catch(() => {
                alert('Não foi possível copiar. Texto: ' + text);
            });
        }
    });
});

// Parallax effect for hero section with fade out (optimized for mobile)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const isMobile = window.innerWidth <= 768;
    
    if (heroImage && scrolled < window.innerHeight) {
        // Reduce parallax movement on mobile for better performance
        const parallaxIntensity = isMobile ? 0.1 : 0.3;
        heroImage.style.transform = `translateY(${scrolled * parallaxIntensity}px)`;
        
        // Fade out effect based on scroll position
        const fadeStart = 0;
        const fadeEnd = window.innerHeight * (isMobile ? 0.4 : 0.6); // Faster fade on mobile
        
        if (scrolled >= fadeStart && scrolled <= fadeEnd) {
            const opacity = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart);
            heroImage.style.opacity = Math.max(0, opacity);
        } else if (scrolled > fadeEnd) {
            heroImage.style.opacity = 0;
        } else {
            heroImage.style.opacity = 1;
        }
    }
});

// Loading animation - DISABLED FOR STATIC DISPLAY
// window.addEventListener('load', () => {
//     document.body.classList.add('loaded');
//     
//     // Stagger animation for hero elements
//     const heroElements = [
//         '.hero-subtitle',
//         '.hero-title', 
//         '.hero-description',
//         '.hero-buttons',
//         '.hero-social'
//     ];
//     
//     heroElements.forEach((selector, index) => {
//         const element = document.querySelector(selector);
//         if (element) {
//             setTimeout(() => {
//                 element.style.opacity = '1';
//                 element.style.transform = 'translateY(0)';
//             }, index * 200);
//         }
//     });
// });

// Initialize hero elements as hidden - DISABLED FOR STATIC DISPLAY
// document.addEventListener('DOMContentLoaded', () => {
//     const heroElements = [
//         '.hero-subtitle',
//         '.hero-title', 
//         '.hero-description',
//         '.hero-buttons',
//         '.hero-social'
//     ];
//     
//     heroElements.forEach(selector => {
//         const element = document.querySelector(selector);
//         if (element) {
//             element.style.opacity = '0';
//             element.style.transform = 'translateY(20px)';
//             element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//         }
//     });
// });

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Translation system
const translations = {
    pt: {
        // Navigation
        'nav-sobre': 'Sobre',
        'nav-formacao': 'Formação',
        'nav-certificados': 'Certificados',
        'nav-habilidades': 'Habilidades',
        'nav-projetos': 'Projetos',
        'nav-contato': 'Contato',
        'brand-title': 'Engenheiro de Software',
        
        // Hero Section
        'hero-title': 'ESTUDANTE DE ENGENHARIA DE SOFTWARE',
        'hero-description': 'Olá, me chamo Samuel<br>Cursando Engenharia de Software, com foco em criar experiências digitais inovadoras, eficientes e alinhadas às necessidades do usuário.',
        'btn-projects': 'Ver Projetos ↓',
        'btn-about': 'Sobre Mim',
        
        // About Section
        'about-subtitle': 'SOBRE MIM',
        'about-title': 'Desenvolvedor em formação com foco em experiências digitais',
        'about-text-1': 'Sou estudante de Engenharia de Software, com foco no desenvolvimento de soluções digitais eficientes e bem estruturadas. Minha trajetória na programação evoluiu para um aprendizado contínuo, voltado a boas práticas e arquitetura de software.',
        'about-text-2': 'Tenho experiência prática em front-end e back-end, trabalhando com tecnologias atuais do mercado e buscando sempre escrever código limpo, escalável e de fácil manutenção.',
        'tag-1': 'Proativo',
        'tag-2': 'Detalhista',
        'tag-3': 'Criativo',
        'tag-4': 'Colaborativo',
        
        // Education Section
        'education-subtitle': 'FORMAÇÃO ACADÊMICA',
        'education-title': 'Minha jornada educacional',
        'education-course': 'Engenharia de Software',
        'education-institution': 'Universidade Católica de Brasília (UCB)',
        'education-period': '2023 - 2025 (previsão)',
        'education-description': 'Engenharia de Software – Universidade Católica de Brasília (UCB)<br>Curso tecnólogo focado em desenvolvimento de software, análise de sistemas, banco de dados e metodologias ágeis, com aprofundamento em programação web, mobile e gestão de projetos de TI. Formação voltada para a aplicação prática de soluções tecnológicas inovadoras, alinhadas às demandas do mercado de software.',
        'course-1-title': 'Desenvolvimento Web Completo',
        'course-1-platform': 'Plataforma Online • 2023',
        'course-1-description': 'JavaScript, React, Node.js, MongoDB, Lua, C# - Do front-end ao back-end.',
        'course-2-title': 'Banco de Dados e SQL',
        'course-2-platform': 'Certificação • 2023',
        'course-2-description': 'Modelagem, otimização e administração de bancos relacionais.',
        
        // Certificates Section
        'certificates-subtitle': 'CERTIFICAÇÕES',
        'certificates-title': 'Meus certificados',
        'cert-1-title': 'Curso Web API',
        'cert-1-platform': 'Plataforma Online',
        'cert-1-year': '2025',
        'cert-2-title': 'C# e .NET',
        'cert-2-platform': 'Certificação',
        'cert-2-year': '2025',
        'btn-certificate': 'Ver certificado',
        
        // Skills Section
        'skills-subtitle': 'HABILIDADES',
        'skills-title': 'Tecnologias & Ferramentas',
        'skills-frontend': 'Frontend',
        'skills-backend': 'Backend',
        'skills-tools': 'Ferramentas',
        
        // Projects Section
        'projects-subtitle': 'PROJETOS',
        'projects-title': 'Alguns dos meus trabalhos',
        'project-1-title': 'Project Zomboid - Necroa',
        'project-1-description': 'Mod completo para Project Zomboid que porta todo um modo de jogo do plague inc para o game.',
        'project-2-title': 'Movies - MongoDB',
        'project-2-description': 'Interface interativa para visualização de dados com MongoDB.',
        'project-3-title': 'API RESTful',
        'project-3-description': 'API robusta para gestão de recursos com autenticação e documentação.',
        'btn-code': 'Código',
        
        // Contact Section
        'contact-subtitle': 'PRECISA DE UM DESENVOLVEDOR?',
        'contact-title': 'Vamos trabalhar juntos →',
        'contact-info-title': 'Informações de contato',
        'contact-info-text': 'Sinta-se à vontade para entrar em contato comigo a qualquer momento. Prefiro conversar por email, especialmente porque podemos estar em fusos horários diferentes.',
        'availability-title': 'Disponibilidade atual',
        'availability-text': 'Atualmente trabalho em vários projetos pessoais, mas estarei feliz em discutir novas oportunidades.',
        'availability-status': 'Disponível para novos projetos',
        'social-title': 'Me siga em',
        
        // Footer
        'footer-quote': 'Sempre aprendendo, sempre evoluindo',
        'footer-copyright': '© 2025 Samuel. Todos os direitos reservados.'
    },
    en: {
        // Navigation
        'nav-sobre': 'About',
        'nav-formacao': 'Education',
        'nav-certificados': 'Certificates',
        'nav-habilidades': 'Skills',
        'nav-projetos': 'Projects',
        'nav-contato': 'Contact',
        'brand-title': 'Software Engineer',
        
        // Hero Section
        'hero-title': 'SOFTWARE ENGINEERING STUDENT',
        'hero-description': 'Hello, my name is Samuel<br>Studying Software Engineering, focused on creating innovative, efficient digital experiences aligned with user needs.',
        'btn-projects': 'View Projects ↓',
        'btn-about': 'About Me',
        
        // About Section
        'about-subtitle': 'ABOUT ME',
        'about-title': 'Developer in training focused on digital experiences',
        'about-text-1': 'I am a Software Engineering student, focused on developing efficient and well-structured digital solutions. My programming journey has evolved into continuous learning, focused on good practices and software architecture.',
        'about-text-2': 'I have practical experience in front-end and back-end development, working with current market technologies and always striving to write clean, scalable and easily maintainable code.',
        'tag-1': 'Proactive',
        'tag-2': 'Detail-oriented',
        'tag-3': 'Creative',
        'tag-4': 'Collaborative',
        
        // Education Section
        'education-subtitle': 'ACADEMIC BACKGROUND',
        'education-title': 'My educational journey',
        'education-course': 'Software Engineering',
        'education-institution': 'Catholic University of Brasília (UCB)',
        'education-period': '2023 - 2025 (expected)',
        'education-description': 'Software Engineering – Catholic University of Brasília (UCB)<br>Technology course focused on software development, systems analysis, databases and agile methodologies, with deepening in web programming, mobile and IT project management. Training aimed at practical application of innovative technological solutions, aligned with software market demands.',
        'course-1-title': 'Complete Web Development',
        'course-1-platform': 'Online Platform • 2023',
        'course-1-description': 'JavaScript, React, Node.js, MongoDB, Lua, C# - From front-end to back-end.',
        'course-2-title': 'Database and SQL',
        'course-2-platform': 'Certification • 2023',
        'course-2-description': 'Modeling, optimization and administration of relational databases.',
        
        // Certificates Section
        'certificates-subtitle': 'CERTIFICATIONS',
        'certificates-title': 'My certificates',
        'cert-1-title': 'Web API Course',
        'cert-1-platform': 'Online Platform',
        'cert-1-year': '2025',
        'cert-2-title': 'C# and .NET',
        'cert-2-platform': 'Certification',
        'cert-2-year': '2025',
        'btn-certificate': 'View certificate',
        
        // Skills Section
        'skills-subtitle': 'SKILLS',
        'skills-title': 'Technologies & Tools',
        'skills-frontend': 'Frontend',
        'skills-backend': 'Backend',
        'skills-tools': 'Tools',
        
        // Projects Section
        'projects-subtitle': 'PROJECTS',
        'projects-title': 'Some of my work',
        'project-1-title': 'Management System',
        'project-1-description': 'Complete web application to manage client data with Node.js and MongoDB.',
        'project-2-title': 'Movies - MongoDB',
        'project-2-description': 'Interactive interface for data visualization with MongoDB.',
        'project-3-title': 'RESTful API',
        'project-3-description': 'Robust API for resource management with authentication and documentation.',
        'btn-code': 'Code',
        
        // Contact Section
        'contact-subtitle': 'NEED A DEVELOPER?',
        'contact-title': 'Let\'s work together →',
        'contact-info-title': 'Contact information',
        'contact-info-text': 'Feel free to contact me at any time. I prefer to talk via email, especially since we might be in different time zones.',
        'availability-title': 'Current availability',
        'availability-text': 'I currently work on various personal projects, but I\'ll be happy to discuss new opportunities.',
        'availability-status': 'Available for new projects',
        'social-title': 'Follow me',
        
        // Footer
        'footer-quote': 'Always learning, always evolving',
        'footer-copyright': '© 2025 Samuel. All rights reserved.'
    }
};

// Language management
let currentLanguage = localStorage.getItem('language') || 'pt';

// Function to translate content
function translateContent(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.innerHTML = translations[language][key];
            }
        }
    });
    
    // Update document language
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    
    // Save language preference
    localStorage.setItem('language', language);
    currentLanguage = language;
}

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    // Add data-translate attributes to elements
    addTranslateAttributes();
    
    // Set initial language
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        translateContent(currentLanguage);
        
        // Add language change listener
        languageSelector.addEventListener('change', (e) => {
            translateContent(e.target.value);
        });
    }
});

// Function to add translate attributes to elements
function addTranslateAttributes() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navKeys = ['nav-sobre', 'nav-formacao', 'nav-certificados', 'nav-habilidades', 'nav-projetos', 'nav-contato'];
    navLinks.forEach((link, index) => {
        if (navKeys[index]) link.setAttribute('data-translate', navKeys[index]);
    });
    
    // Brand title
    const brandTitle = document.querySelector('.brand-title');
    if (brandTitle) brandTitle.setAttribute('data-translate', 'brand-title');
    
    // Hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.setAttribute('data-translate', 'hero-title');
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.setAttribute('data-translate', 'hero-description');
    
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) btnPrimary.setAttribute('data-translate', 'btn-projects');
    
    const btnSecondary = document.querySelector('.btn-secondary');
    if (btnSecondary) btnSecondary.setAttribute('data-translate', 'btn-about');
    
    // Section subtitles and titles
    const subtitles = document.querySelectorAll('.section-subtitle');
    const subtitleKeys = ['about-subtitle', 'education-subtitle', 'certificates-subtitle', 'skills-subtitle', 'projects-subtitle', 'contact-subtitle'];
    subtitles.forEach((subtitle, index) => {
        if (subtitleKeys[index]) subtitle.setAttribute('data-translate', subtitleKeys[index]);
    });
    
    const titles = document.querySelectorAll('.section-title');
    const titleKeys = ['about-title', 'education-title', 'certificates-title', 'skills-title', 'projects-title', 'contact-title'];
    titles.forEach((title, index) => {
        if (titleKeys[index]) title.setAttribute('data-translate', titleKeys[index]);
    });
    
    // About section
    const aboutTexts = document.querySelectorAll('.about-text p');
    if (aboutTexts[0]) aboutTexts[0].setAttribute('data-translate', 'about-text-1');
    if (aboutTexts[1]) aboutTexts[1].setAttribute('data-translate', 'about-text-2');
    
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag, index) => {
        tag.setAttribute('data-translate', `tag-${index + 1}`);
    });
    
    // Education section
    const educationCourse = document.querySelector('.education-card h3');
    if (educationCourse) educationCourse.setAttribute('data-translate', 'education-course');
    
    const educationInstitution = document.querySelector('.education-institution');
    if (educationInstitution) educationInstitution.setAttribute('data-translate', 'education-institution');
    
    const educationPeriod = document.querySelector('.education-period');
    if (educationPeriod) educationPeriod.setAttribute('data-translate', 'education-period');
    
    const educationDescription = document.querySelector('.education-description');
    if (educationDescription) educationDescription.setAttribute('data-translate', 'education-description');
    
    // Courses
    const courseTitles = document.querySelectorAll('.course-card h4');
    courseTitles.forEach((title, index) => {
        title.setAttribute('data-translate', `course-${index + 1}-title`);
    });
    
    const coursePlatforms = document.querySelectorAll('.course-platform');
    coursePlatforms.forEach((platform, index) => {
        platform.setAttribute('data-translate', `course-${index + 1}-platform`);
    });
    
    const courseDescriptions = document.querySelectorAll('.course-description');
    courseDescriptions.forEach((description, index) => {
        description.setAttribute('data-translate', `course-${index + 1}-description`);
    });
    
    // Certificates
    const certTitles = document.querySelectorAll('.certificate-card h3');
    certTitles.forEach((title, index) => {
        title.setAttribute('data-translate', `cert-${index + 1}-title`);
    });
    
    const certPlatforms = document.querySelectorAll('.certificate-platform');
    certPlatforms.forEach((platform, index) => {
        platform.setAttribute('data-translate', `cert-${index + 1}-platform`);
    });
    
    const certYears = document.querySelectorAll('.certificate-year');
    certYears.forEach((year, index) => {
        year.setAttribute('data-translate', `cert-${index + 1}-year`);
    });
    
    const btnCertificates = document.querySelectorAll('.btn-certificate');
    btnCertificates.forEach(btn => {
        btn.setAttribute('data-translate', 'btn-certificate');
    });
    
    // Skills section headings
    const skillsSections = document.querySelectorAll('.skills-section h3');
    const skillsKeys = ['skills-frontend', 'skills-backend', 'skills-tools'];
    skillsSections.forEach((section, index) => {
        if (skillsKeys[index]) section.setAttribute('data-translate', skillsKeys[index]);
    });
    
    // Projects
    const projectTitles = document.querySelectorAll('.project-content h3');
    projectTitles.forEach((title, index) => {
        title.setAttribute('data-translate', `project-${index + 1}-title`);
    });
    
    const projectDescriptions = document.querySelectorAll('.project-content p');
    projectDescriptions.forEach((description, index) => {
        description.setAttribute('data-translate', `project-${index + 1}-description`);
    });
    
    const btnProjects = document.querySelectorAll('.btn-project');
    btnProjects.forEach(btn => {
        btn.setAttribute('data-translate', 'btn-code');
    });
    
    // Contact section
    const contactInfoTitle = document.querySelector('.contact-info h3');
    if (contactInfoTitle) contactInfoTitle.setAttribute('data-translate', 'contact-info-title');
    
    const contactInfoText = document.querySelector('.contact-info p');
    if (contactInfoText) contactInfoText.setAttribute('data-translate', 'contact-info-text');
    
    const availabilityTitle = document.querySelector('.availability h3');
    if (availabilityTitle) availabilityTitle.setAttribute('data-translate', 'availability-title');
    
    const availabilityText = document.querySelector('.availability p');
    if (availabilityText) availabilityText.setAttribute('data-translate', 'availability-text');
    
    const availabilityStatus = document.querySelector('.availability-status span:last-child');
    if (availabilityStatus) availabilityStatus.setAttribute('data-translate', 'availability-status');
    
    const socialTitle = document.querySelector('.social-links h3');
    if (socialTitle) socialTitle.setAttribute('data-translate', 'social-title');
    
    // Footer
    const footerQuote = document.querySelector('.footer-quote');
    if (footerQuote) footerQuote.setAttribute('data-translate', 'footer-quote');
    
    const footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright) footerCopyright.setAttribute('data-translate', 'footer-copyright');
}

console.log('🚀 Portfolio JavaScript carregado com sucesso!');