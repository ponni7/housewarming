// --- 1. Countdown Timer Functionality ---
// Target date and time for the housewarming (December 10, 2025, 05:00:00 AM)
const housewarmingDate = new Date("December 10, 2025 05:00:00").getTime();

const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = housewarmingDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the elements, using padStart for leading zeros
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    // Ensure elements exist before updating
    if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.innerHTML = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.innerHTML = seconds.toString().padStart(2, '0');

    // If the countdown is over, stop the timer and display a message
    if (distance < 0) {
        clearInterval(countdownTimer);
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.innerHTML = "<p>The celebration has begun! Welcome!</p>";
        }
    }
}, 1000);


// --- 2. Google Maps Functionality (Inline Map & Directions Link) ---
const mapLink = document.getElementById('map-link');
const mapContainer = document.getElementById('inline-map');
const destinationAddress = "Flat PG01, Block 4, Casagrand Utopia, Manapakkam, Chennai - 600125, Tamilnadu"; 
// Sanitize address for use in URL query parameters
const sanitizedAddress = destinationAddress.replace(/,/g, '').replace(/\s/g, '+');


// Function to display the inline map centered on the destination address
function displayInlineMap() {
    const zoomLevel = 14; 

    // Google Maps Embed URL using the sanitized address
    const mapEmbedUrl = `https://maps.google.com/maps?q=${sanitizedAddress}&t=&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;
    
    if (mapContainer) {
        mapContainer.innerHTML = `
            <iframe
                width="100%"
                height="100%"
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0"
                src="${mapEmbedUrl}"
                title="Location of Mithraalaiyam"
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>`;
    }
}

// Set up the direction button link using geolocation
function setupDirectionLink() {
    // 1. Display the inline map immediately (centered on the address)
    displayInlineMap();

    // 2. Attempt to get geolocation for directions link
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const startLat = position.coords.latitude;
            const startLng = position.coords.longitude;
            
            // Construct the Google Maps URL for directions from current location
            const googleMapsURL = `https://www.google.com/maps/dir/${startLat},${startLng}/${sanitizedAddress}`;
            
            if (mapLink) {
                mapLink.href = googleMapsURL;
                mapLink.textContent = "Get Directions from Your Location";
            }

        }, function(error) {
            // Error getting location (e.g., user denied permission)
            const destinationURL = `https://www.google.com/maps/search/?api=1&query=${sanitizedAddress}`;
            if (mapLink) {
                mapLink.href = destinationURL;
                mapLink.textContent = "Get Directions to Our Home";
            }
            console.error("Geolocation failed for directions:", error.message);
        });
    } else {
        // Browser doesn't support Geolocation
        const destinationURL = `https://www.google.com/maps/search/?api=1&query=${sanitizedAddress}`;
        if (mapLink) {
            mapLink.href = destinationURL;
        }
    }
}

// Initialize map and link setup when the window loads
window.onload = setupDirectionLink;


// --- 3. Image Carousel Functionality ---
const carouselSlide = document.getElementById('carousel-slide');
// Get all image elements within the carousel
const images = carouselSlide ? carouselSlide.querySelectorAll('img') : []; 
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let counter = 0;
const imageCount = images.length;

if (carouselSlide && prevBtn && nextBtn && imageCount > 0) {
    
    // Function to move the carousel
    function updateCarousel() {
        const size = 100; // Width of a single image is 100% of the container
        // Translate the slide container horizontally
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + '%)';
    }

    // Event listeners for navigation
    nextBtn.addEventListener('click', () => {
        // Loop back to the first image if at the end
        counter = (counter + 1) % imageCount;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        // Loop back to the last image if at the beginning
        counter = (counter - 1 + imageCount) % imageCount;
        updateCarousel();
    });

    // Optional: Auto-slide feature
    setInterval(() => {
        counter = (counter + 1) % imageCount;
        updateCarousel();
    }, 5000); // Change image every 5 seconds
}
