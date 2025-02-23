/* eslint-disable react/prop-types */
import styles from "./Template.module.css";
// import { Template_Gsap } from './Gsap'
function Template1({ Template1 }) {
    // Template_Gsap()
    return (
        <>
            {Template1.map((templateItem, index) => (
                <div key={index} className={styles.main_info_container}>
                    <div className={styles.info_container1}>
                        <h1 className={styles.info_cheat_sheet1}>
                            {templateItem.heading1}
                        </h1>
                        <p className={styles.info_cheat_sheet2}>
                            {templateItem.heading2}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Template1;
