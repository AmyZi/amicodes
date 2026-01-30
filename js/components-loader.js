/**
 * Component Loader
 * Loads header and footer components into pages
 */

(function() {
  'use strict';

  // Load component HTML from external file
  function loadComponent(componentPath, targetSelector) {
    fetch(componentPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${componentPath}: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          targetElement.innerHTML = html;
          
          // Reinitialize Bootstrap tooltips after component loads
          if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
              return new bootstrap.Tooltip(tooltipTriggerEl);
            });
          }
        }
      })
      .catch(error => {
        console.error('Error loading component:', error);
      });
  }

  // Load components when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      loadComponent('/components/header.html', '#header-placeholder');
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      loadComponent('/components/footer.html', '#footer-placeholder');
    }
  });

})();