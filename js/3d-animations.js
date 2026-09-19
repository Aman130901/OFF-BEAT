document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. PRELOADER & LENIS SMOOTH SCROLL & CURSOR
    // ==========================================
    // Hide Preloader when everything is loaded
    window.addEventListener("load", () => {
        const preloader = document.querySelector(".preloader");
        if (preloader) {
            setTimeout(() => preloader.classList.add("hidden"), 500);
        }
    });

    // Lenis Smooth Scroll
    if (window.Lenis) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (cursor && follower && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        const loop = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(loop);
        };
        loop();

        // Hover effects for cursor
        const interactables = document.querySelectorAll('a, button, input, textarea, select, .step');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('active'));
            el.addEventListener('mouseleave', () => follower.classList.remove('active'));
        });
    }

    // Magnetic Buttons
    const magneticElements = document.querySelectorAll('.btn');
    magneticElements.forEach((el) => {
        el.classList.add('magnetic');
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==========================================
    // 1. THREE.JS 3D BACKGROUND SETUP
    // ==========================================
    const canvas = document.getElementById("bg-canvas");
    if (canvas && window.THREE) {
        const scene = new THREE.Scene();
        // Add a subtle fog for depth
        scene.fog = new THREE.FogExp2(0x0b0930, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create Particles
        const particleCount = 700;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorGold = new THREE.Color(0xFFC61A);
        const colorBlue = new THREE.Color(0x2418E8);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 400; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // z

            // Mix colors
            const mixedColor = colorGold.clone().lerp(colorBlue, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create a circular texture for particles programmatically
        const createCircleTexture = () => {
            const matCanvas = document.createElement('canvas');
            matCanvas.width = 64;
            matCanvas.height = 64;
            const context = matCanvas.getContext('2d');
            context.beginPath();
            context.arc(32, 32, 28, 0, 2 * Math.PI);
            context.fillStyle = '#ffffff';
            context.fill();
            return new THREE.CanvasTexture(matCanvas);
        };

        const material = new THREE.PointsMaterial({
            size: 2.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            map: createCircleTexture(),
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Add some floating icosahedrons for extra 3D feel
        const meshes = [];
        const geoIcosahedron = new THREE.IcosahedronGeometry(8, 0);
        const matIcosahedron = new THREE.MeshBasicMaterial({ 
            color: 0x2418E8, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.3 
        });

        for (let i = 0; i < 5; i++) {
            const mesh = new THREE.Mesh(geoIcosahedron, matIcosahedron);
            mesh.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 100
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            scene.add(mesh);
            meshes.push({
                mesh: mesh,
                rx: (Math.random() - 0.5) * 0.01,
                ry: (Math.random() - 0.5) * 0.01
            });
        }

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        // Animation Loop
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.05;
            targetY = mouseY * 0.05;

            // Rotate particles slowly
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;

            // Parallax effect on mouse move
            camera.position.x += (targetX - camera.position.x) * 0.02;
            camera.position.y += (-targetY - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            // Animate floating icosahedrons
            meshes.forEach(item => {
                item.mesh.rotation.x += item.rx;
                item.mesh.rotation.y += item.ry;
                item.mesh.position.y += Math.sin(elapsedTime * 2 + item.mesh.position.x) * 0.05;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ==========================================
    // 2. GSAP SCROLL ANIMATIONS
    // ==========================================
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Utility to select and animate if exists
        const animateOnScroll = (selector, animationProps) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                gsap.from(elements, {
                    ...animationProps,
                    scrollTrigger: {
                        trigger: elements[0], // Trigger based on first element or use batching if needed
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            }
        };

        // Hero Section 3D Reveal
        gsap.from(".hero .display", {
            duration: 1.5,
            y: 100,
            opacity: 0,
            rotationX: 45,
            transformOrigin: "0% 50% -50",
            ease: "power3.out",
            stagger: 0.1
        });
        
        gsap.from(".hero .lede, .hero .seq", {
            duration: 1.2,
            y: 50,
            opacity: 0,
            delay: 0.5,
            ease: "power2.out",
            stagger: 0.2
        });

        // Batch animation for section rows/cards to pop in with 3D feel
        const rows = document.querySelectorAll('.row, .flow li, .fact');
        if (rows.length > 0) {
            ScrollTrigger.batch(rows, {
                onEnter: batch => gsap.from(batch, {
                    opacity: 0, 
                    y: 60,
                    rotationX: 15,
                    transformOrigin: "50% 50% -100px",
                    stagger: { each: 0.1, grid: [1, 3] },
                    duration: 1,
                    ease: "power3.out"
                }),
                start: "top 90%"
            });
        }

        // Section Headers
        gsap.utils.toArray('h2.display').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 90%"
                },
                duration: 1.2,
                y: 50,
                opacity: 0,
                skewY: 5,
                ease: "power3.out"
            });
        });

        // Pitch section specifically
        gsap.from("#pitch .wrap > *", {
            scrollTrigger: {
                trigger: "#pitch",
                start: "top 80%"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        });
    }
});
