const header = document.getElementById("header");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileNav = document.getElementById("mobileNav");
const themeButton = document.getElementById("themeButton");
const mobileThemeButton = document.getElementById("mobileThemeButton");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const typingText = document.getElementById("typingText");

const roles = [
    "Python & Machine Learning",
    "Generative AI",
    "RAG & AI Applications",
    "AI Engineering"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeAnimation() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeAnimation, 1600);

            return;
        }

        setTimeout(typeAnimation, 70);

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;

            setTimeout(typeAnimation, 400);

            return;
        }

        setTimeout(typeAnimation, 40);
    }
}

typeAnimation();


function updateThemeButtons() {

    const darkMode =
        document.body.classList.contains("dark-mode");

    if (darkMode) {

        themeButton.textContent = "☀";

        mobileThemeButton.textContent =
            "☀ Light Mode";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeButton.textContent = "◐";

        mobileThemeButton.textContent =
            "◐ Dark Mode";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


function setTheme(mode) {

    if (mode === "dark") {

        document.body.classList.add("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    } else {

        document.body.classList.remove("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );
    }

    updateThemeButtons();
}


function toggleTheme() {

    const isDark =
        document.body.classList.contains("dark-mode");

    setTheme(isDark ? "light" : "dark");
}


const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

updateThemeButtons();


themeButton.addEventListener(
    "click",
    toggleTheme
);


mobileThemeButton.addEventListener(
    "click",
    () => {

        toggleTheme();

        mobileNav.classList.remove("open");

        const spans =
            mobileMenuButton.querySelectorAll("span");

        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
    }
);


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 15px 40px rgba(48,65,110,.12)";

    } else {

        header.style.boxShadow =
            "0 10px 35px rgba(54,72,120,.08)";
    }

    updateActiveNavigation();
});


function updateActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    const links =
        document.querySelectorAll(".desktop-nav a");

    let current = "home";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            current = section.id;
        }
    });

    links.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");
        }
    });
}


mobileMenuButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle("open");

        const spans =
            mobileMenuButton.querySelectorAll("span");

        if (
            mobileNav.classList.contains("open")
        ) {

            spans[0].style.transform =
                "translateY(6px) rotate(45deg)";

            spans[1].style.opacity = "0";

            spans[2].style.transform =
                "translateY(-6px) rotate(-45deg)";

        } else {

            spans[0].style.transform = "";

            spans[1].style.opacity = "";

            spans[2].style.transform = "";
        }
    }
);


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove("open");

                const spans =
                    mobileMenuButton
                        .querySelectorAll("span");

                spans[0].style.transform = "";
                spans[1].style.opacity = "";
                spans[2].style.transform = "";
            }
        );
    });


contactForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const name =
            document.getElementById("name")
                .value.trim();

        const email =
            document.getElementById("email")
                .value.trim();

        const subject =
            document.getElementById("subject")
                .value.trim();

        const message =
            document.getElementById("message")
                .value.trim();


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            formStatus.textContent =
                "Please fill in all fields.";

            formStatus.style.color =
                "#e74c3c";

            return;
        }


        const submitButton =
            contactForm.querySelector(
                ".send-button"
            );


        submitButton.disabled = true;

        submitButton.style.opacity = "0.7";

        submitButton.style.cursor =
            "not-allowed";


        formStatus.textContent =
            "Sending your message...";

        formStatus.style.color =
            "#19bd91";


        const formData =
            new FormData();


        formData.append(
            "name",
            name
        );

        formData.append(
            "email",
            email
        );

        formData.append(
            "subject",
            subject
        );

        formData.append(
            "message",
            message
        );


        try {

            const response =
                await fetch(
                    "https://formspree.io/f/xqpanqzq",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            if (response.ok) {

                formStatus.textContent =
                    "✓ Message sent successfully. Thank you for reaching out!";

                formStatus.style.color =
                    "#19bd91";

                contactForm.reset();

            } else {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

                formStatus.style.color =
                    "#e74c3c";
            }

        } catch (error) {

            formStatus.textContent =
                "Unable to send the message. Please try again later.";

            formStatus.style.color =
                "#e74c3c";

        } finally {

            submitButton.disabled = false;

            submitButton.style.opacity = "";

            submitButton.style.cursor = "";
        }
    }
);


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );
                }
            });
        },
        {
            threshold: 0.12
        }
    );


const animatedElements =
    document.querySelectorAll(
        ".section-label, .section-title, .about-main, .about-card, .skill-card, .project-card, .experience-item, .certification-card, .direct-contact, .message-box"
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);
});


document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (targetId === "#") {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


const profileImage =
    document.querySelector(
        ".profile-container"
    );


const heroRight =
    document.querySelector(
        ".hero-right"
    );


if (heroRight && profileImage) {

    heroRight.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                event.currentTarget
                    .getBoundingClientRect();


            const x =
                (
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5
                ) * 8;


            const y =
                (
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5
                ) * 8;


            profileImage.style.transform =
                `translate(${x}px, ${y}px)`;
        }
    );


    heroRight.addEventListener(
        "mouseleave",
        () => {

            profileImage.style.transform =
                "translate(0,0)";
        }
    );
}