// ===== PROJECT FILTER =====
// Kartu proyek dibuat secara dinamis (lihat render-projects.js), jadi
// filter di-inisialisasi setelah event 'projects:rendered', bukan DOMContentLoaded.
document.addEventListener('projects:rendered', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });

            // Re-trigger animation for visible cards
            setTimeout(() => {
                projectCards.forEach(card => {
                    if (card.style.display !== 'none') {
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, 10);
                    }
                });
            }, 100);
        });
    });

    // ===== PROJECT SEARCH (Optional) =====
    // Add search functionality if needed
    const searchInput = document.querySelector('.project-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                const tags = card.querySelectorAll('.project-tech span');
                let tagText = '';
                tags.forEach(tag => tagText += tag.textContent.toLowerCase());
                
                const isMatch = title.includes(searchTerm) || 
                               description.includes(searchTerm) || 
                               tagText.includes(searchTerm);
                
                if (isMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ===== PROJECT MODAL (Optional) =====
    // Add modal functionality for project details
    const projectLinks = document.querySelectorAll('.project-card .btn-small');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.textContent.includes('Lihat Detail') || 
                link.textContent.includes('Live Demo')) {
                e.preventDefault();
                // Open modal or navigate to detail page
                console.log('Project clicked:', link.closest('.project-card'));
            }
        });
    });

    // ===== LAZY LOAD IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.project-card img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== PROJECT CARD HOVER EFFECT =====
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // ===== COUNT PROJECTS BY CATEGORY =====
    const countProjects = () => {
        const categories = {};
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            categories[category] = (categories[category] || 0) + 1;
        });
        
        // Update filter button badges if needed
        filterButtons.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            if (filter !== 'all') {
                const count = categories[filter] || 0;
                if (count > 0) {
                    btn.textContent = btn.textContent.replace(/ \(\d+\)/, '');
                    btn.textContent += ` (${count})`;
                }
            }
        });
    };

    countProjects();
});

// ===== SORT PROJECTS (Optional) =====
const sortProjects = (order = 'newest') => {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.project-card'));
    
    cards.sort((a, b) => {
        const dateA = a.getAttribute('data-date') || '';
        const dateB = b.getAttribute('data-date') || '';
        
        if (order === 'newest') {
            return dateB.localeCompare(dateA);
        } else {
            return dateA.localeCompare(dateB);
        }
    });

    cards.forEach(card => grid.appendChild(card));
};

// ===== EXPORT FUNCTIONS =====
// If using modules, uncomment below:
// export { filterProjects, sortProjects };