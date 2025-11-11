// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    mobileMenuBtn.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    })
  })
}

// Header scroll effect
const header = document.getElementById("header")
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > 100) {
    header.style.backgroundColor = "rgba(251, 249, 237, 0.98)"
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.backgroundColor = "rgba(251, 249, 237, 0.95)"
    header.style.boxShadow = "none"
  }

  lastScrollY = currentScrollY
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// Button hover effects
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

// Card hover effects
document
  .querySelectorAll(".problem-card, .benefit-card, .service-card, .team-member, .transition-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

// Service card hover effects (special case for larger movement)
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

// Icon rotation on hover
document.querySelectorAll(".card-icon-container, .service-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "rotate(360deg)"
  })

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "rotate(0deg)"
  })
})

// Approach item slide effect
document.querySelectorAll(".approach-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(10px)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateX(0)"
  })
})

// Contact button functionality
document.querySelectorAll(".btn").forEach((button) => {
  if (
    button.textContent.includes("Contactar") ||
    button.textContent.includes("Solicitar") ||
    button.textContent.includes("Agendar")
  ) {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Simple alert for demo purposes
      if (this.textContent.includes("Solicitar")) {
        alert("¡Gracias por tu interés! Te contactaremos pronto para programar tu diagnóstico gratuito.")
      } else if (this.textContent.includes("Agendar")) {
        alert("¡Perfecto! Te redirigiremos a nuestro calendario para agendar una reunión.")
      } else {
        alert("¡Hola! Te contactaremos pronto para conocer más sobre tus necesidades.")
      }
    })
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mobileMenu.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
  }
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Additional scroll-based animations can be added here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Initialize all animations and interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add initial animation classes
  document.body.classList.add("loaded")

  // Stagger animation for cards
  const cards = document.querySelectorAll(".problem-card, .benefit-card, .service-card")
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)
  })

  console.log("QUATRO PARTNERS website loaded successfully!")
})

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.style.display = "none"
    console.warn("Image failed to load:", this.src)
  })
})

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Add focus styles for keyboard navigation
const style = document.createElement("style")
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #806e88 !important;
        outline-offset: 2px !important;
    }
`
document.head.appendChild(style)

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #806e88, #735f7a);
        z-index: 9999;
        transition: width 0.1s ease;
    `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })
}

// Initialize scroll progress
createScrollProgress()

AOS.init({
  duration: 1000,
  once: true
});

