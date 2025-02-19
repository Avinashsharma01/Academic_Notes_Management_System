import styles from "./Phase3.module.css";
import { phase3Info } from "../../../assets/CarouselData";

function Phase3() {
    return (
        <>
            {phase3Info.map((items, index) => (
                <div key={index} className={styles.Phase3_main_container}>
                    <div className={styles.main_info_container1}>
                        <div className={styles.info_container1}>
                            <div className={styles.Icon_box1}>
                                <img src={items.image1} alt="" />
                            </div>
                            <h1
                                className={[
                                    styles.info_cheat_sheet1,
                                    "Hello",
                                ].join(" ")}
                            >
                                {items.heading1}
                            </h1>
                            <p
                                className={[
                                    styles.info_cheat_sheet2,
                                    "Helloo",
                                ].join(" ")}
                            >
                                {items.heading2}
                            </p>
                        </div>
                        <div className={styles.info_container2}>
                            <div className={styles.info_box1}>
                                <div className={styles.Icon_box2}>
                                    <img src={items.image2} alt="" />
                                </div>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading3}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading4}
                                </p>
                            </div>
                            <div className={styles.info_box2}>
                                <div className={styles.Icon_box2}>
                                    <img src={items.image3} alt="" />
                                </div>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading5}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading6}
                                </p>
                            </div>
                            <div className={styles.info_box3}>
                                <div className={styles.Icon_box2}>
                                    <img src={items.image4} alt="" />
                                </div>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading7}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading8}
                                </p>
                            </div>
                            <div className={styles.info_box4}>
                                <div className={styles.Icon_box2}>
                                    <img src={items.image5} alt="" />
                                </div>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading9}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading10}
                                </p>
                            </div>
                            <div className={styles.info_box5}>
                                <div className={styles.Icon_box2}>
                                    <img src={items.image6} alt="" />
                                </div>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading11}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading12}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Phase3;
