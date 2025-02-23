import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Carousel_Gsap = () => {
    useGSAP(() => {
        gsap.from(".carousel", {
            y: -500,
            duration: 2,
        });
    });
};

export const Phase3_Gsap = () => {
    useGSAP(() => {
        gsap.from(".Hello", {
            // x: -50,
            duration: 3,
            delay: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: ".Phase3_main_container",
                scroller: "body",
                start: "top 60%",
                end: "top 30%",
                scrub: 1,
                // markers: true,
                scale: 1,
            },
        });
        gsap.from(".info-container1", {
            x: 50,
            duration: 3,
            delay: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: ".info-container1",
                scroller: "body",
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
                // markers: true,
                // scale:0.5
            },
        });
        gsap.from(".info_box1", {
            y: 50,
            duration: 3,
            delay: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: ".info_box1",
                scroller: "body",
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
                // markers: true,
                // scale:0.5
            },
        });
        gsap.from(".info_box2", {
            y: 50,
            duration: 3,
            delay: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: ".info_box2",
                scroller: "body",
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
                // markers: true,
                // scale:0.5
            },
        });
        gsap.from(".info_box3", {
            y: 50,
            duration: 3,
            delay: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: ".info_box3",
                scroller: "body",
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
                // markers: true,
                // scale:0.5
            },
        });
        gsap.from(".info_box4", {
            y: -50,
            duration: 3,
            delay: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: ".info_box4",
                scroller: "body",
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
                // markers: true,
                // scale:0.5
            },
        });
        gsap.from(".info_box5", {
            y: -50,
            duration: 3,
            delay: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: ".info_box5",
                scroller: "body",
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
                // markers: true,
                // scale:0.5
            },
        });
    });
};

export const Phase4_Gsap = () => {
    useGSAP(() => {
        gsap.from(".phase4-info-container1", {
            x: -550,
            duration: 5,
            delay: 1,
            scrollTrigger: {
                trigger: ".phase4-info-container1",
                scroller: "body",
                start: "top 90%",
                end: "top 40%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase4-info-container2", {
            x: -400,
            duration: 5,
            delay: 1,
            scrollTrigger: {
                trigger: ".phase4-info-container2",
                scroller: "body",
                start: "top 90%",
                end: "top 50%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase4-info-container3", {
            x: -600,
            duration: 5,
            delay: 1,
            scrollTrigger: {
                trigger: ".phase4-info-container3",
                scroller: "body",
                start: "top 90%",
                end: "top 45%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase4-info-container4", {
            x: -450,
            duration: 5,
            delay: 1,
            scrollTrigger: {
                trigger: ".phase4-info-container4",
                scroller: "body",
                start: "top 90%",
                end: "top 45%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase4-info-container5", {
            x: -500,
            duration: 5,
            delay: 1,
            scrollTrigger: {
                trigger: ".phase4-info-container5",
                scroller: "body",
                start: "top 90%",
                end: "top 50%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase4-info-container6", {
            x: -600,
            duration: 5,
            delay: 1,
            scrollTrigger: {
                trigger: ".phase4-info-container6",
                scroller: "body",
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
                // markers:true
            },
        });

        gsap.from(".phase4-image-container1", {
            // rotate:100,
            x: -10,
            y: -10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container1",
                scroller: "body",
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container2", {
            // rotate:100,
            y: -10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container2",
                scroller: "body",
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container3", {
            // rotate:100,
            x: 10,
            y: -10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container3",
                scroller: "body",
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container4", {
            // rotate:100,
            x: -10,
            // y:-10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container4",
                scroller: "body",
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container5", {
            // rotate:100,
            x: -10,
            // y:-10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container5",
                scroller: "body",
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container6", {
            // rotate:100,
            x: 10,
            // y:-10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container6",
                scroller: "body",
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container7", {
            // rotate:100,
            x: -10,
            y: 10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container7",
                scroller: "body",
                start: "top 100%",
                end: "top 70%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container8", {
            y: 10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container8",
                scroller: "body",
                start: "top 100%",
                end: "top 70%",
                scrub: 1,
                // markers:true,
            },
        });
        gsap.from(".phase4-image-container9", {
            y: 10,
            x: 10,
            duration: 5,
            delay: 1,
            scale: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase4-image-container9",
                scroller: "body",
                start: "top 100%",
                end: "top 70%",
                scrub: 1,
                // markers:true,
            },
        });
    });
};

export const Phase6_Gsap = () => {
    useGSAP(() => {
        gsap.from(".Phase6_template1", {
            y: -200,
            duration: 5,
            delay: 1,
            opacity: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".Phase6_template1",
                scroller: "body",
                // markers:true,
                start: "top 65%",
                end: "top 35%",
                scrub: 1,
            },
        });
        gsap.from(".Phase6_template2", {
            scale: 0,
            duration: 2,
            delay: 1,
            opacity: 0,
            yoyo: true,
            scrollTrigger: {
                trigger: ".Phase6_template2",
                scroller: "body",
                // markers:true,
                start: "top 90%",
                end: "top 55%",
                scrub: 1,
            },
        });
    });
};

export const Phase7_Gsap = () => {
    useGSAP(() => {
        gsap.from(".Phase7-slider-boxes", {
            x: 750,
            duration: 3,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".Phase7-slider-boxes",
                scroller: "body",
                start: "top 80%",
                end: "top 45%",
                scrub: 1,
                // markers:true
            },
        });

        gsap.from(".phase7-titel1", {
            y: -100,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase7-titel1",
                scroller: "body",
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
                // markers:true
            },
        });

        gsap.from(".phase7-titel2", {
            scale: 0,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase7-titel2",
                scroller: "body",
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase7-icon-box1", {
            scale: 0,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase7-icon-box1",
                scroller: "body",
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase7-titel3", {
            x: -100,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase7-titel3",
                scroller: "body",
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase7-titel4", {
            x: -100,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase7-titel4",
                scroller: "body",
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase7-info-page", {
            y: 150,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase7-info-page",
                scroller: "body",
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
                // markers:true
            },
        });
    });
};

export const Phase8_Gsap = () => {
    useGSAP(() => {
        gsap.from(".phase8-info-cheat-sheet1", {
            y: -100,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase8-info-cheat-sheet1",
                scroller: "body",
                start: "top 75%",
                end: "top 45%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase8-info-cheat-sheet2", {
            scale: 0,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase8-info-cheat-sheet2",
                scroller: "body",
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
                // markers:true
            },
        });
        gsap.from(".phase8-icon-info-box1", {
            scale: 0,
            duration: 3,
            opacity: 0,
            delay: 1,
            yoyo: true,
            scrollTrigger: {
                trigger: ".phase8-icon-info-box1",
                scroller: "body",
                start: "top 80%",
                end: "top 55%",
                scrub: 1,
                // markers:true
            },
        });
    });
};

export const Phase5_Gsap = () => {
    useGSAP(() => {
        gsap.from(".carousel-boxes", {
            y: 250,
            duration: 1,
            delay: 1,
            scrollTrigger: {
                trigger: ".carousel-boxes",
                scroller: "body",
                start: "top 100%",
                end: "top 70%",
                scrub: 1,
                scale: 1,
            },
        });
        gsap.from(".button-box1", {
            duration: 2,
            delay: 1,
            scale: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".button-box1",
                scroller: "body",
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
                scale: 1,
                // markers:true
            },
        });
    });
};
