import styles from "./Phase6.module.css";
import { phase6Info } from "./CarouselData";
import { Phase6_Gsap } from "./Gsap";

function Phase6() {
    Phase6_Gsap();
    return (
        <>
            {phase6Info.map((items, index) => (
                <div key={index} className={styles.Phase6_main_container}>
                    <div
                        className={[styles.template1, "Phase6_template1"].join(
                            " "
                        )}
                    >
                        <h1 className={styles.info_cheat_sheet1}>
                            {items.heading1}
                        </h1>
                        <p className={styles.info_cheat_sheet2}>
                            {items.heading2}
                        </p>
                    </div>
                    <div
                        className={[styles.template2, "Phase6_template2"].join(
                            " "
                        )}
                    >
                        <h2 className={styles.info_cheat_sheet2}>
                            {items.heading3}
                        </h2>
                        <button className={styles.button}>Click</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Phase6;
