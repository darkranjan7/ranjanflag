/* ========================================
   Country Flag Survival - Game Logic
   ======================================== */

// Game Constants
const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 900;
const FPS = 60;

// Circle Arena Settings
const CIRCLE_CENTER = { x: SCREEN_WIDTH / 2, y: 420 };
const CIRCLE_RADIUS = 220;
const GAP_ANGLE = 30; // Gap size in degrees
const GAP_INITIAL_POSITION = 270; // Gap at bottom
const NUM_FLAGS = 100; // Number of flags in arena

// Colors
const COLORS = {
    skyBlueTop: '#87CEEB',
    skyBlueBottom: '#4682B4',
    darkGray: '#282828',
    white: '#FFFFFF',
    gold: '#FFD700',
    green: '#228B22',
    darkGreen: '#006400'
};

// Extended country list with ISO codes - 150+ countries
const COUNTRIES = [
    // Major Countries
    { code: 'IN', name: 'India' }, { code: 'US', name: 'USA' }, { code: 'GB', name: 'UK' },
    { code: 'CN', name: 'China' }, { code: 'JP', name: 'Japan' }, { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' }, { code: 'BR', name: 'Brazil' }, { code: 'RU', name: 'Russia' },
    { code: 'AU', name: 'Australia' }, { code: 'CA', name: 'Canada' }, { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' }, { code: 'MX', name: 'Mexico' }, { code: 'KR', name: 'S.Korea' },
    { code: 'SA', name: 'S.Arabia' }, { code: 'EG', name: 'Egypt' }, { code: 'ZA', name: 'S.Africa' },
    { code: 'AR', name: 'Argentina' }, { code: 'TR', name: 'Turkiye' }, { code: 'ID', name: 'Indonesia' },
    { code: 'PK', name: 'Pakistan' }, { code: 'NG', name: 'Nigeria' }, { code: 'BD', name: 'Bangladesh' },
    { code: 'TH', name: 'Thailand' }, { code: 'VN', name: 'Vietnam' }, { code: 'PH', name: 'Philippines' },
    { code: 'MY', name: 'Malaysia' }, { code: 'SG', name: 'Singapore' }, { code: 'NZ', name: 'N.Zealand' },
    // Europe
    { code: 'SE', name: 'Sweden' }, { code: 'NO', name: 'Norway' }, { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' }, { code: 'PL', name: 'Poland' }, { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' }, { code: 'CH', name: 'Switzerland' }, { code: 'AT', name: 'Austria' },
    { code: 'PT', name: 'Portugal' }, { code: 'GR', name: 'Greece' }, { code: 'IE', name: 'Ireland' },
    { code: 'UA', name: 'Ukraine' }, { code: 'CZ', name: 'Czechia' }, { code: 'RO', name: 'Romania' },
    { code: 'HU', name: 'Hungary' }, { code: 'BG', name: 'Bulgaria' }, { code: 'RS', name: 'Serbia' },
    { code: 'HR', name: 'Croatia' }, { code: 'SK', name: 'Slovakia' }, { code: 'SI', name: 'Slovenia' },
    { code: 'BA', name: 'Bosnia' }, { code: 'AL', name: 'Albania' }, { code: 'MK', name: 'N.Macedonia' },
    { code: 'ME', name: 'Montenegro' }, { code: 'MD', name: 'Moldova' }, { code: 'BY', name: 'Belarus' },
    { code: 'LT', name: 'Lithuania' }, { code: 'LV', name: 'Latvia' }, { code: 'EE', name: 'Estonia' },
    { code: 'IS', name: 'Iceland' }, { code: 'LU', name: 'Luxembourg' }, { code: 'MT', name: 'Malta' },
    { code: 'CY', name: 'Cyprus' }, { code: 'MC', name: 'Monaco' }, { code: 'AD', name: 'Andorra' },
    // Middle East
    { code: 'IL', name: 'Israel' }, { code: 'AE', name: 'UAE' }, { code: 'IQ', name: 'Iraq' },
    { code: 'IR', name: 'Iran' }, { code: 'SY', name: 'Syria' }, { code: 'JO', name: 'Jordan' },
    { code: 'LB', name: 'Lebanon' }, { code: 'KW', name: 'Kuwait' }, { code: 'QA', name: 'Qatar' },
    { code: 'BH', name: 'Bahrain' }, { code: 'OM', name: 'Oman' }, { code: 'YE', name: 'Yemen' },
    // Asia
    { code: 'NP', name: 'Nepal' }, { code: 'LK', name: 'Sri Lanka' }, { code: 'MM', name: 'Myanmar' },
    { code: 'KH', name: 'Cambodia' }, { code: 'LA', name: 'Laos' }, { code: 'MN', name: 'Mongolia' },
    { code: 'KZ', name: 'Kazakhstan' }, { code: 'UZ', name: 'Uzbekistan' }, { code: 'AF', name: 'Afghanistan' },
    { code: 'TM', name: 'Turkmenistan' }, { code: 'KG', name: 'Kyrgyzstan' }, { code: 'TJ', name: 'Tajikistan' },
    { code: 'AZ', name: 'Azerbaijan' }, { code: 'GE', name: 'Georgia' }, { code: 'AM', name: 'Armenia' },
    { code: 'BN', name: 'Brunei' }, { code: 'MV', name: 'Maldives' }, { code: 'BT', name: 'Bhutan' },
    { code: 'TL', name: 'Timor-Leste' }, { code: 'KP', name: 'N.Korea' }, { code: 'TW', name: 'Taiwan' },
    // Africa
    { code: 'KE', name: 'Kenya' }, { code: 'GH', name: 'Ghana' }, { code: 'ET', name: 'Ethiopia' },
    { code: 'TZ', name: 'Tanzania' }, { code: 'MA', name: 'Morocco' }, { code: 'DZ', name: 'Algeria' },
    { code: 'TN', name: 'Tunisia' }, { code: 'LY', name: 'Libya' }, { code: 'SD', name: 'Sudan' },
    { code: 'UG', name: 'Uganda' }, { code: 'RW', name: 'Rwanda' }, { code: 'AO', name: 'Angola' },
    { code: 'MZ', name: 'Mozambique' }, { code: 'ZW', name: 'Zimbabwe' }, { code: 'ZM', name: 'Zambia' },
    { code: 'BW', name: 'Botswana' }, { code: 'NA', name: 'Namibia' }, { code: 'SN', name: 'Senegal' },
    { code: 'CI', name: 'Ivory Coast' }, { code: 'CM', name: 'Cameroon' }, { code: 'ML', name: 'Mali' },
    { code: 'MG', name: 'Madagascar' }, { code: 'MU', name: 'Mauritius' }, { code: 'CD', name: 'DR Congo' },
    { code: 'CG', name: 'Congo' }, { code: 'GA', name: 'Gabon' }, { code: 'BF', name: 'Burkina Faso' },
    { code: 'NE', name: 'Niger' }, { code: 'TD', name: 'Chad' }, { code: 'MR', name: 'Mauritania' },
    { code: 'GM', name: 'Gambia' }, { code: 'GN', name: 'Guinea' }, { code: 'SL', name: 'Sierra Leone' },
    { code: 'LR', name: 'Liberia' }, { code: 'TG', name: 'Togo' }, { code: 'BJ', name: 'Benin' },
    { code: 'SS', name: 'S.Sudan' }, { code: 'BI', name: 'Burundi' }, { code: 'MW', name: 'Malawi' },
    { code: 'ER', name: 'Eritrea' }, { code: 'DJ', name: 'Djibouti' }, { code: 'SO', name: 'Somalia' },
    // Americas
    { code: 'CO', name: 'Colombia' }, { code: 'PE', name: 'Peru' }, { code: 'CL', name: 'Chile' },
    { code: 'VE', name: 'Venezuela' }, { code: 'CU', name: 'Cuba' }, { code: 'EC', name: 'Ecuador' },
    { code: 'GT', name: 'Guatemala' }, { code: 'PA', name: 'Panama' }, { code: 'CR', name: 'Costa Rica' },
    { code: 'UY', name: 'Uruguay' }, { code: 'PY', name: 'Paraguay' }, { code: 'BO', name: 'Bolivia' },
    { code: 'DO', name: 'Dominican Rep' }, { code: 'HN', name: 'Honduras' }, { code: 'SV', name: 'El Salvador' },
    { code: 'NI', name: 'Nicaragua' }, { code: 'JM', name: 'Jamaica' }, { code: 'TT', name: 'Trinidad' },
    { code: 'HT', name: 'Haiti' }, { code: 'BS', name: 'Bahamas' }, { code: 'BB', name: 'Barbados' },
    { code: 'BZ', name: 'Belize' }, { code: 'GY', name: 'Guyana' }, { code: 'SR', name: 'Suriname' },
    { code: 'PR', name: 'Puerto Rico' },
    // Oceania
    { code: 'FJ', name: 'Fiji' }, { code: 'PG', name: 'Papua NG' }, { code: 'WS', name: 'Samoa' },
    { code: 'TO', name: 'Tonga' }, { code: 'VU', name: 'Vanuatu' }, { code: 'SB', name: 'Solomon Is' }
];

/* ========================================
   Flag Class
   ======================================== */
class Flag {
    constructor(code, name, x, y, image) {
        this.code = code;
        this.name = name;
        this.x = x;
        this.y = y;
        this.image = image;
        
        // Flag dimensions (smaller for 100 flags)
        this.width = 28;
        this.height = 20;
        this.radius = 12; // Collision radius for circular collision detection
        this.mass = 1; // Mass for physics calculations
        
        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 1.0;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        // State
        this.alive = true;
        this.eliminated = false;
        this.falling = false;
        this.fallVy = 0;
        this.gravity = 0.2;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 6;
        
        // Bounce boost properties
        this.boostTimer = 0;
        this.boostMultiplier = 1.0;
    }
    
    update(gapStartAngle, gapEndAngle) {
        if (!this.alive) {
            if (this.eliminated) {
                return; // Already settled at bottom
            }
            
            // ===== FALLING PHYSICS (no collision with other flags) =====
            
            // Apply gravity with slight acceleration
            this.gravity = Math.min(this.gravity + 0.005, 0.5); // Gradual gravity increase
            this.fallVy += this.gravity;
            
            // Apply air resistance (more realistic)
            const airResistance = 0.995;
            this.vx *= airResistance;
            this.fallVy *= 0.999; // Less resistance vertically
            
            // Update position
            this.y += this.fallVy;
            this.x += this.vx;
            
            // Rotation speeds up as flag falls (tumbling effect)
            this.rotationSpeed += (Math.random() - 0.5) * 0.3;
            this.rotationSpeed = Math.max(-8, Math.min(8, this.rotationSpeed)); // Limit rotation
            this.rotation += this.rotationSpeed;
            
            // Slight wobble effect (wind simulation)
            this.vx += (Math.random() - 0.5) * 0.1;
            
            // Keep within screen bounds horizontally (bounce off edges)
            if (this.x < 15) {
                this.x = 15;
                this.vx = Math.abs(this.vx) * 0.6;
                this.rotationSpeed *= -0.8; // Reverse rotation on bounce
            } else if (this.x > SCREEN_WIDTH - 15) {
                this.x = SCREEN_WIDTH - 15;
                this.vx = -Math.abs(this.vx) * 0.6;
                this.rotationSpeed *= -0.8;
            }
            
            // Land at bottom with slight randomness
            const groundY = SCREEN_HEIGHT - 50 - Math.random() * 35;
            if (this.y >= groundY) {
                this.y = groundY;
                this.x += (Math.random() - 0.5) * 10; // Slight scatter on landing
                this.vx = 0;
                this.fallVy = 0;
                this.rotationSpeed = 0;
                this.rotation = (Math.random() - 0.5) * 20; // Random final rotation
                this.eliminated = true;
            }
            return;
        }
        
        // Boost timer update
        if (this.boostTimer > 0) {
            this.boostTimer--;
            this.boostMultiplier = 1.0 + (this.boostTimer / 60.0) * 0.5;
        } else {
            this.boostMultiplier = 1.0;
        }
        
        // Position update with boost
        this.x += this.vx * this.boostMultiplier;
        this.y += this.vy * this.boostMultiplier;
        
        // Very gentle pull towards center for flags far from center
        const dxCenter = CIRCLE_CENTER.x - this.x;
        const dyCenter = CIRCLE_CENTER.y - this.y;
        const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        if (distCenter > 100) {
            const pull = 0.003;
            this.vx += (dxCenter / distCenter) * pull;
            this.vy += (dyCenter / distCenter) * pull;
        }
        
        // Calculate distance from center
        const dx = this.x - CIRCLE_CENTER.x;
        const dy = this.y - CIRCLE_CENTER.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate angle of flag from center
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        
        // Check if flag is at the gap
        let inGap = false;
        if (gapStartAngle < gapEndAngle) {
            inGap = angle >= gapStartAngle && angle <= gapEndAngle;
        } else {
            inGap = angle >= gapStartAngle || angle <= gapEndAngle;
        }
        
        // Collision with circle boundary
        const boundary = CIRCLE_RADIUS - 18;
        if (distance > boundary) {
            if (inGap) {
                // Flag escapes through gap - natural exit trajectory
                this.alive = false;
                this.falling = true;
                this.gravity = 0.15; // Reset gravity for falling
                
                if (distance > 0) {
                    // Maintain momentum in exit direction
                    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                    const exitSpeed = Math.max(currentSpeed * 0.8, 2.0);
                    
                    // Direction towards gap center with some of original velocity
                    const exitDirX = dx / distance;
                    const exitDirY = dy / distance;
                    
                    this.vx = exitDirX * exitSpeed * 0.7 + this.vx * 0.5;
                    this.fallVy = Math.abs(exitDirY) * exitSpeed * 0.3 + 0.5;
                    
                    // Add random rotation for tumbling effect
                    this.rotationSpeed = (Math.random() - 0.5) * 10;
                }
            } else {
                // Bounce off the wall - elastic collision
                const nx = dx / distance;
                const ny = dy / distance;
                
                // Reflect velocity with energy preservation
                const dot = this.vx * nx + this.vy * ny;
                this.vx = this.vx - 2 * dot * nx;
                this.vy = this.vy - 2 * dot * ny;
                
                // Small random perturbation for variety
                const tiltAngle = (Math.random() - 0.5) * 0.3;
                const cosT = Math.cos(tiltAngle);
                const sinT = Math.sin(tiltAngle);
                const newVx = this.vx * cosT - this.vy * sinT;
                const newVy = this.vx * sinT + this.vy * cosT;
                this.vx = newVx;
                this.vy = newVy;
                
                // Activate small speed boost
                this.boostTimer = 30;
                this.boostMultiplier = 1.3;
                
                // Push back inside
                this.x = CIRCLE_CENTER.x + nx * (boundary - 3);
                this.y = CIRCLE_CENTER.y + ny * (boundary - 3);
                
                // Speed limits
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const maxSpeed = 3.0;
                const minSpeed = 1.2;
                if (speed > maxSpeed) {
                    this.vx = (this.vx / speed) * maxSpeed;
                    this.vy = (this.vy / speed) * maxSpeed;
                } else if (speed < minSpeed && speed > 0) {
                    this.vx = (this.vx / speed) * minSpeed;
                    this.vy = (this.vy / speed) * minSpeed;
                }
            }
        }
    }
    
    draw(ctx) {
        if (this.eliminated) {
            // Draw at bottom pile (smaller)
            const size = { width: 22, height: 15 };
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.drawImage(this.image, -size.width / 2, -size.height / 2, size.width, size.height);
            ctx.restore();
        } else if (this.alive) {
            // Draw active flag
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            // Thin border for visibility
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            // Falling flag (rotated)
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
    }
    
    // Check collision with another flag and resolve with natural physics
    collideWith(other) {
        // Only collide if BOTH flags are alive (not falling/eliminated)
        if (!this.alive || !other.alive) return;
        
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = this.radius + other.radius;
        
        if (distance < minDist && distance > 0) {
            // Collision detected - elastic collision response
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Relative velocity
            const dvx = this.vx - other.vx;
            const dvy = this.vy - other.vy;
            
            // Relative velocity along collision normal
            const dvn = dvx * nx + dvy * ny;
            
            // Only resolve if objects are moving towards each other
            if (dvn > 0) {
                // Elastic collision impulse (equal masses) with extra energy
                const restitution = 1.1; // Slightly more than 1 for acceleration effect
                const impulse = dvn * restitution;
                
                // Apply impulse to velocities
                this.vx -= impulse * nx;
                this.vy -= impulse * ny;
                other.vx += impulse * nx;
                other.vy += impulse * ny;
                
                // Activate speed boost for BOTH flags (like wall bounce)
                this.boostTimer = 25;
                this.boostMultiplier = 1.25;
                other.boostTimer = 25;
                other.boostMultiplier = 1.25;
                
                // Add small random deflection for more chaotic movement
                const randomAngle1 = (Math.random() - 0.5) * 0.15;
                const randomAngle2 = (Math.random() - 0.5) * 0.15;
                this.vx += Math.cos(randomAngle1) * 0.2;
                this.vy += Math.sin(randomAngle1) * 0.2;
                other.vx += Math.cos(randomAngle2) * 0.2;
                other.vy += Math.sin(randomAngle2) * 0.2;
                
                // Separate the flags to prevent overlap
                const overlap = minDist - distance;
                const separationX = (overlap / 2 + 1) * nx;
                const separationY = (overlap / 2 + 1) * ny;
                
                this.x -= separationX;
                this.y -= separationY;
                other.x += separationX;
                other.y += separationY;
                
                // Apply speed limits after collision
                this.applySpeedLimits();
                other.applySpeedLimits();
            }
        }
    }
    
    // Apply speed limits to keep movement controlled
    applySpeedLimits() {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 3.5;
        const minSpeed = 1.0;
        
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        } else if (speed < minSpeed && speed > 0.1) {
            this.vx = (this.vx / speed) * minSpeed;
            this.vy = (this.vy / speed) * minSpeed;
        }
    }
}

/* ========================================
   Game Class
   ======================================== */
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = SCREEN_WIDTH;
        this.canvas.height = SCREEN_HEIGHT;
        
        // Game state
        this.flags = [];
        this.gapAngle = GAP_INITIAL_POSITION;
        this.gapRotationSpeed = 0.5;
        this.winner = null;
        this.gameOver = false;
        this.countdown = 0;
        
        // Leaderboard
        this.leaderboard = this.loadLeaderboard();
        
        // Image cache
        this.flagImages = {};
        this.loading = true;
        
        // Create gradient background
        this.backgroundGradient = this.createBackgroundGradient();
        
        // UI Elements
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressFill = document.getElementById('progress-fill');
        this.loadStatus = document.getElementById('load-status');
        this.winnerScreen = document.getElementById('winner-screen');
        this.winnerFlag = document.getElementById('winner-flag');
        this.winnerName = document.getElementById('winner-name');
        this.countdownText = document.getElementById('countdown-text');
        this.aliveCount = document.getElementById('alive-count');
        
        // Setup input handlers
        this.setupInputHandlers();
        
        // Start loading
        this.preloadFlags();
    }
    
    createBackgroundGradient() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, SCREEN_HEIGHT);
        gradient.addColorStop(0, COLORS.skyBlueTop);
        gradient.addColorStop(1, COLORS.skyBlueBottom);
        return gradient;
    }
    
    setupInputHandlers() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    this.resetGame();
                    break;
                case 'ArrowLeft':
                    this.gapRotationSpeed = Math.max(-3, this.gapRotationSpeed - 0.3);
                    break;
                case 'ArrowRight':
                    this.gapRotationSpeed = Math.min(3, this.gapRotationSpeed + 0.3);
                    break;
                case 'Escape':
                    this.gapRotationSpeed = 0.5;
                    break;
            }
        });
    }
    
    getFlagUrl(countryCode) {
        // Use higher resolution for better quality
        return `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`;
    }
    
    async preloadFlags() {
        // Load ALL countries for the pool
        const allCountries = [...COUNTRIES];
        let loaded = 0;
        const total = allCountries.length;
        
        // Load flags in batches to avoid overwhelming the browser
        const batchSize = 20;
        for (let i = 0; i < allCountries.length; i += batchSize) {
            const batch = allCountries.slice(i, i + batchSize);
            
            const batchPromises = batch.map(async (country) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    // Set timeout for slow loading flags
                    const timeout = setTimeout(() => {
                        if (!this.flagImages[country.code]) {
                            this.flagImages[country.code] = this.createFallbackFlag(country.code);
                            loaded++;
                            this.updateLoadingProgress(loaded, total);
                        }
                        resolve();
                    }, 5000);
                    
                    img.onload = () => {
                        clearTimeout(timeout);
                        this.flagImages[country.code] = img;
                        loaded++;
                        this.updateLoadingProgress(loaded, total);
                        resolve();
                    };
                    
                    img.onerror = () => {
                        clearTimeout(timeout);
                        // Create fallback colored canvas
                        this.flagImages[country.code] = this.createFallbackFlag(country.code);
                        loaded++;
                        this.updateLoadingProgress(loaded, total);
                        resolve();
                    };
                    
                    img.src = this.getFlagUrl(country.code);
                });
            });
            
            await Promise.all(batchPromises);
        }
        
        this.loading = false;
        this.loadingScreen.classList.add('hidden');
        this.resetGame();
        this.startGameLoop();
    }
    
    createFallbackFlag(countryCode) {
        const canvas = document.createElement('canvas');
        canvas.width = 80;
        canvas.height = 60;
        const ctx = canvas.getContext('2d');
        
        // Generate colors based on code
        const hash = countryCode.charCodeAt(0) * 1000 + countryCode.charCodeAt(1);
        const color1 = `hsl(${hash % 360}, 70%, 50%)`;
        const color2 = `hsl(${(hash + 180) % 360}, 70%, 50%)`;
        
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, 80, 30);
        ctx.fillStyle = color2;
        ctx.fillRect(0, 30, 80, 30);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(0, 0, 80, 60);
        
        return canvas;
    }
    
    updateLoadingProgress(loaded, total) {
        const percent = (loaded / total) * 100;
        this.progressFill.style.width = `${percent}%`;
        this.loadStatus.textContent = `${loaded}/${total}`;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    resetGame() {
        this.flags = [];
        this.gapAngle = GAP_INITIAL_POSITION;
        this.winner = null;
        this.gameOver = false;
        this.countdown = 0;
        
        // Hide winner screen
        this.winnerScreen.classList.add('hidden');
        
        // Create flags - 100 flags
        const selectedCountries = this.shuffleArray([...COUNTRIES]).slice(0, NUM_FLAGS);
        
        // Use grid-based placement to avoid initial overlaps
        const placedPositions = [];
        const minDistance = 25; // Minimum distance between flag centers
        
        for (const country of selectedCountries) {
            let x, y, attempts = 0;
            let validPosition = false;
            
            while (!validPosition && attempts < 50) {
                const angle = Math.random() * Math.PI * 2;
                const distance = 30 + Math.random() * (CIRCLE_RADIUS - 80);
                x = CIRCLE_CENTER.x + Math.cos(angle) * distance;
                y = CIRCLE_CENTER.y + Math.sin(angle) * distance;
                
                // Check distance from all placed flags
                validPosition = true;
                for (const pos of placedPositions) {
                    const dx = x - pos.x;
                    const dy = y - pos.y;
                    if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
                        validPosition = false;
                        break;
                    }
                }
                attempts++;
            }
            
            placedPositions.push({ x, y });
            const image = this.flagImages[country.code] || this.createFallbackFlag(country.code);
            this.flags.push(new Flag(country.code, country.name, x, y, image));
        }
        
        this.updateAliveCount();
    }
    
    updateAliveCount() {
        const alive = this.flags.filter(f => f.alive).length;
        this.aliveCount.textContent = alive;
    }
    
    update(deltaTime) {
        // Update gap rotation
        this.gapAngle = (this.gapAngle + this.gapRotationSpeed) % 360;
        if (this.gapAngle < 0) this.gapAngle += 360;
        
        let gapStart = (this.gapAngle - GAP_ANGLE / 2) % 360;
        let gapEnd = (this.gapAngle + GAP_ANGLE / 2) % 360;
        if (gapStart < 0) gapStart += 360;
        if (gapEnd < 0) gapEnd += 360;
        
        if (!this.gameOver) {
            // Update all flags
            for (const flag of this.flags) {
                flag.update(gapStart, gapEnd);
            }
            
            // Flag-to-flag collision detection (optimized)
            const aliveFlags = this.flags.filter(f => f.alive);
            for (let i = 0; i < aliveFlags.length; i++) {
                for (let j = i + 1; j < aliveFlags.length; j++) {
                    aliveFlags[i].collideWith(aliveFlags[j]);
                }
            }
            
            // Check for winner
            if (aliveFlags.length === 1) {
                this.winner = aliveFlags[0];
                this.gameOver = true;
                this.countdown = 5;
                
                // Update leaderboard
                if (this.leaderboard[this.winner.code]) {
                    this.leaderboard[this.winner.code].wins++;
                } else {
                    this.leaderboard[this.winner.code] = {
                        name: this.winner.name,
                        wins: 1
                    };
                }
                this.saveLeaderboard();
                this.updateLeaderboardUI();
                this.showWinnerScreen();
            } else if (aliveFlags.length === 0) {
                this.gameOver = true;
                this.countdown = 5;
            }
            
            this.updateAliveCount();
        } else {
            // Update falling flags
            for (const flag of this.flags) {
                if (!flag.alive && !flag.eliminated) {
                    flag.update(gapStart, gapEnd);
                }
            }
            
            // Countdown
            this.countdown -= deltaTime / 1000;
            if (this.winner) {
                this.countdownText.textContent = `Next round in ${Math.ceil(this.countdown)}s`;
            }
            
            if (this.countdown <= 0) {
                this.resetGame();
            }
        }
    }
    
    draw() {
        // Draw gradient background
        this.ctx.fillStyle = this.backgroundGradient;
        this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        
        // Draw ground
        this.ctx.fillStyle = COLORS.green;
        this.ctx.fillRect(0, SCREEN_HEIGHT - 50, SCREEN_WIDTH, 50);
        this.ctx.fillStyle = COLORS.darkGreen;
        this.ctx.fillRect(0, SCREEN_HEIGHT - 50, SCREEN_WIDTH, 5);
        
        // Draw eliminated flags in pile
        for (const flag of this.flags) {
            if (flag.eliminated) {
                flag.draw(this.ctx);
            }
        }
        
        // Draw circle arena
        this.drawCircleArena();
        
        // Draw active and falling flags
        for (const flag of this.flags) {
            if (!flag.eliminated) {
                flag.draw(this.ctx);
            }
        }
    }
    
    drawCircleArena() {
        const gapStart = this.gapAngle - GAP_ANGLE / 2;
        const gapEnd = this.gapAngle + GAP_ANGLE / 2;
        
        const numPoints = 180;
        const pointAngle = 360 / numPoints;
        const thickness = 6;
        
        this.ctx.fillStyle = COLORS.darkGray;
        
        for (let i = 0; i < numPoints; i++) {
            const angle = i * pointAngle;
            
            // Check if in gap
            let normAngle = angle % 360;
            let normGapStart = ((gapStart % 360) + 360) % 360;
            let normGapEnd = ((gapEnd % 360) + 360) % 360;
            
            let inGap = false;
            if (normGapStart < normGapEnd) {
                inGap = normAngle >= normGapStart && normAngle <= normGapEnd;
            } else {
                inGap = normAngle >= normGapStart || normAngle <= normGapEnd;
            }
            
            if (!inGap) {
                const rad = angle * (Math.PI / 180);
                const x = CIRCLE_CENTER.x + Math.cos(rad) * CIRCLE_RADIUS;
                const y = CIRCLE_CENTER.y + Math.sin(rad) * CIRCLE_RADIUS;
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, thickness, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
    
    showWinnerScreen() {
        if (this.winner) {
            this.winnerFlag.src = this.getFlagUrl(this.winner.code);
            this.winnerName.textContent = this.winner.name;
            this.winnerScreen.classList.remove('hidden');
        }
    }
    
    loadLeaderboard() {
        try {
            const saved = localStorage.getItem('flagSurvivalLeaderboard');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }
    
    saveLeaderboard() {
        try {
            localStorage.setItem('flagSurvivalLeaderboard', JSON.stringify(this.leaderboard));
        } catch {
            // LocalStorage not available
        }
    }
    
    updateLeaderboardUI() {
        const content = document.getElementById('leaderboard-content');
        const sorted = Object.entries(this.leaderboard)
            .sort((a, b) => b[1].wins - a[1].wins)
            .slice(0, 3);
        
        if (sorted.length === 0) {
            content.innerHTML = '<p class="no-data">No wins yet</p>';
            return;
        }
        
        const medals = ['gold', 'silver', 'bronze'];
        const ranks = ['1.', '2.', '3.'];
        
        content.innerHTML = sorted.map(([code, data], index) => `
            <div class="leaderboard-entry">
                <span class="rank ${medals[index]}">${ranks[index]}</span>
                <img src="${this.getFlagUrl(code)}" alt="${data.name}">
                <span class="wins">${data.wins}</span>
            </div>
        `).join('');
    }
    
    startGameLoop() {
        let lastTime = 0;
        
        const gameLoop = (timestamp) => {
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            
            this.update(deltaTime);
            this.draw();
            
            requestAnimationFrame(gameLoop);
        };
        
        // Initial leaderboard update
        this.updateLeaderboardUI();
        
        requestAnimationFrame(gameLoop);
    }
}

/* ========================================
   Start Game
   ======================================== */
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
