import styles from "./Phase3.module.css";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
function Phase3() {
    return (
        <div className={styles.Phase3_main_container}>
            <div className={styles.info_container1}>
                <div
                    className={[
                        styles.icon_box,
                        "flex justify-center items-center text-4xl",
                    ].join(" ")}
                >
                    <AiOutlineFileDone />
                </div>
                <div className={styles.info_box}>
                    <h1 className={styles.cheat_sheet1}>Online</h1>
                    <h1 className={styles.cheat_sheet2}>Certifications</h1>
                </div>
            </div>
            <div className={styles.info_container1}>
                <div
                    className={[
                        styles.icon_box,
                        "flex justify-center items-center text-4xl",
                    ].join(" ")}
                >
                    <FaChalkboardTeacher />
                </div>
                <div className={styles.info_box}>
                    <h1 className={styles.cheat_sheet1}>Top</h1>
                    <h1 className={styles.cheat_sheet2}>Instructors</h1>
                </div>
            </div>
            <div className={styles.info_container1}>
                <div
                    className={[
                        styles.icon_box,
                        "flex justify-center items-center text-4xl",
                    ].join(" ")}
                >
                    <BiNotepad />
                </div>
                <div className={styles.info_box}>
                    <h1 className={styles.cheat_sheet1}>Unlimited</h1>
                    <h1 className={styles.cheat_sheet2}>Notes</h1>
                </div>
            </div>
            <div className={styles.info_container1}>
                <div
                    className={[
                        styles.icon_box,
                        "flex justify-center items-center text-4xl",
                    ].join(" ")}
                >
                    <FaUsers />
                </div>
                <div className={styles.info_box}>
                    <h1 className={styles.cheat_sheet1}>Experienced</h1>
                    <h1 className={styles.cheat_sheet2}>Members</h1>
                </div>
            </div>
        </div>
    );
}

export default Phase3;
