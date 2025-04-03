document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bubble-container');
    if (!container) return;
    
    // Configuration for bubbles
    const config = {
        numBubbles: 4,
        minSize: 150,
        maxSize: 400,
        followSpeed: [0.02, 0.04, 0.06, 0.08] // Different speeds for each bubble
    };
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const bubbles = [];
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        const heroRect = container.getBoundingClientRect();
        if (e.clientY >= heroRect.top && e.clientY <= heroRect.bottom) {
            mouseX = e.clientX;
            mouseY = e.clientY - heroRect.top;
        }
    });
    
    // Create bubbles
    for (let i = 0; i < config.numBubbles; i++) {
        createBubble(container, config, i);
    }
    
    function createBubble(container, config, index) {
        // Create element
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size
        const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Initial position (random)
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * container.offsetHeight;
        bubble.style.left = `${startX - size/2}px`;
        bubble.style.top = `${startY - size/2}px`;
        
        // Use blue colors with lower opacity
        const blueColors = [
            'hsla(220, 85%, 60%, 0.15)',    // Bright blue
            'hsla(210, 85%, 60%, 0.15)',    // Sky blue
            'hsla(230, 85%, 60%, 0.15)',    // Royal blue
            'hsla(240, 85%, 60%, 0.15)'     // Deep blue
        ];
        bubble.style.backgroundColor = blueColors[index];
        
        // Store position data
        const bubbleData = {
            element: bubble,
            x: startX,
            y: startY,
            targetX: startX,
            targetY: startY,
            size: size,
            followSpeed: config.followSpeed[index]
        };
        
        bubbles.push(bubbleData);
        container.appendChild(bubble);
    }
    
    // Animation loop
    function animate() {
        bubbles.forEach(bubble => {
            // Calculate target position (relative to cursor)
            bubble.targetX = mouseX;
            bubble.targetY = mouseY;
            
            // Move toward target with easing
            bubble.x += (bubble.targetX - bubble.x) * bubble.followSpeed;
            bubble.y += (bubble.targetY - bubble.y) * bubble.followSpeed;
            
            // Update position (centered)
            bubble.element.style.left = `${bubble.x - bubble.size/2}px`;
            bubble.element.style.top = `${bubble.y - bubble.size/2}px`;
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}); 