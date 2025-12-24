// ===================================
// Portfolio Dynamic Projects Manager
// ===================================

// 📁 PROJECTS DATA - Add or Remove Projects Here!
const projects = [
    {
        title: "Bank System",
        description: "Training project on the principles of OOP",
        techs: ["C++", "Console", "OOP"],
        features: "System logic analysis and construction, Practical application of OOP, Data management without a database.",
        githubLink: "https://github.com/q-hBar/Simple-Bank-Project",
        liveLink: null // Set to null if no live demo
    },
    {
        title: "Security Playground",
        description: "Learn about web security vulnerabilities through interactive examples",
        techs: ["HTML", "CSS", "JS"],
        features: "Interactive CTF Challenges, Multiple Web Security Categories, Built-in Solutions for Learning",
        liveLink: "https://q-hbar.github.io/CTF-Challenges/"
    },

];

// ===================================
// Render Projects Function
// ===================================
function renderProjects() {
    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        const techTags = project.techs.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const links = [];
        if (project.githubLink) {
            links.push(`<a href="${project.githubLink}" target="_blank">GitHub →</a>`);
        }
        if (project.liveLink) {
            links.push(`<a href="${project.liveLink}" target="_blank">Live Demo →</a>`);
        }

        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${techTags}
            </div>
            <p><strong>Features:</strong> ${project.features}</p>
            <div class="project-links">
                ${links.join('')}
            </div>
        `;

        projectGrid.appendChild(projectCard);
    });
}

// ===================================
// Typing Effect for Hero Section
// ===================================
function typingEffect() {
    const element = document.querySelector('.typing-effect');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
function initSmoothScroll() {
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
}

// ===================================
// Contact Form Handler
// ===================================
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// ===================================
// Scroll Reveal Animation
// ===================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe project cards
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
}

// ===================================
// Active Navigation Link
// ===================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#ffffff';
            }
        });
    });
}

// ===================================
// Initialize Everything on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Initialized');
    
    // Render projects
    renderProjects();
    
    // Initialize features
    setTimeout(typingEffect, 500);
    initSmoothScroll();
    handleContactForm();
    initScrollReveal();
    initActiveNav();
    
    // Show home section immediately
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.opacity = '1';
        homeSection.style.transform = 'translateY(0)';
    }
});

// ===================================
// Utility: Add New Project
// ===================================
function addProject(projectData) {
    projects.push(projectData);
    renderProjects();
    console.log('✓ Project added successfully');
}

// ===================================
// Utility: Remove Project by Title
// ===================================
function removeProject(title) {
    const index = projects.findIndex(p => p.title === title);
    if (index > -1) {
        projects.splice(index, 1);
        renderProjects();
        console.log(`✓ Project "${title}" removed successfully`);
    } else {
        console.log(`✗ Project "${title}" not found`);
    }
}

// Example Usage in Console:
// addProject({
//     title: "New Project",
//     description: "Description here",
//     techs: ["React", "Node.js"],
//     features: "Cool features",
//     githubLink: "https://github.com/...",
//     liveLink: null
// });
//
// removeProject("ToDo API");