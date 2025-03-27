import styles from "./Phase9.module.css";

function Phase9() {
    return <div className={styles.Phase9_main_container}></div>;
}
export default Phase9;

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const ScrollTriggerComponent = () => {
//   const boxRef = useRef(null);

//   useEffect(() => {
//     const box = boxRef.current;

//     gsap.fromTo(
//       box,
//       { opacity: 0, y: 100 },
//       {
//         opacity: 1,
//         y: 0,
//         scrollTrigger: {
//           trigger: box,
//           start: "top 50%", // Starts animation when top of element reaches 80% of viewport
//           end: "bottom 20%", // Ends animation when bottom of element reaches 20% of viewport
//           scrub: 1, // Smooth effect on scroll
//           // markers:true,
//           markers:true

//         },
//       }
//     );
//   }, []);

//   return (
//     <div style={{ height: "200vh", padding: "50px" }}>
//       <h2>Scroll down to see the effect</h2>
//       <div
//         ref={boxRef}
//         style={{
//           width: "200px",
//           height: "200px",
//           backgroundColor: "tomato",
//           margin: "100px auto",
//         }}
//       >
//         Scroll-triggered Box
//       </div>
//     </div>
//   );
// };

// export default ScrollTriggerComponent;
