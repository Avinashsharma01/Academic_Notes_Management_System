import { Phase4_Gsap } from "./Gsap";
import styles from "./Phase4.module.css";
import { phase4Info } from "../Components/CarouselData";

function Phase4() {
    Phase4_Gsap();

    return (
        <>
            {phase4Info.map((items, index) => (
                <div key={index} className={styles.Phase4_main_container}>
                    <div className={styles.main_info_container1}>
                        <div
                            className={[
                                styles.info_container1,
                                "phase4-info-container1",
                            ].join(" ")}
                        >
                            <div className={styles.info_box}>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading1}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading2}
                                </p>
                            </div>
                            <div
                                className={[
                                    styles.info_icon_box,
                                    "phase4-info-icon-box1",
                                ].join(" ")}
                            ></div>
                        </div>
                        <div
                            className={[
                                styles.info_container2,
                                "phase4-info-container2",
                            ].join(" ")}
                        >
                            <div className={styles.info_box}>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading3}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading4}
                                </p>
                            </div>
                            <div className={styles.info_icon_box}></div>
                        </div>
                        <div
                            className={[
                                styles.info_container3,
                                "phase4-info-container3",
                            ].join(" ")}
                        >
                            <div className={styles.info_box}>
                                <h1 className={styles.info_cheat_sheet1}>
                                    {items.heading5}
                                </h1>
                                <p className={styles.info_cheat_sheet2}>
                                    {items.heading6}
                                </p>
                            </div>
                            <div className={styles.info_icon_box}></div>
                        </div>
                        <div
                            className={[
                                styles.info_container4,
                                "phase4-info-container4",
                            ].join(" ")}
                        >
                            <div className={styles.info_box}></div>
                            <div className={styles.info_icon_box}></div>
                        </div>
                        <div
                            className={[
                                styles.info_container5,
                                "phase4-info-container5",
                            ].join(" ")}
                        >
                            <div className={styles.info_box}></div>
                            <div className={styles.info_icon_box}></div>
                        </div>
                        <div
                            className={[
                                styles.info_container6,
                                "phase4-info-container6",
                            ].join(" ")}
                        >
                            <div className={styles.info_box}></div>
                            <div className={styles.info_icon_box}></div>
                        </div>
                    </div>
                    <div className={styles.main_info_container2}>
                        <div
                            className={[
                                styles.image_container1,
                                "phase4-image-container1",
                            ].join(" ")}
                        ></div>
                        <div
                            className={[
                                styles.image_container2,
                                "phase4-image-container2",
                            ].join(" ")}
                        ></div>
                        <div
                            className={[
                                styles.image_container3,
                                "phase4-image-container3",
                            ].join(" ")}
                        ></div>
                        <div
                            className={[
                                styles.image_container4,
                                "phase4-image-container4",
                            ].join(" ")}
                        ></div>
                        <div
                            className={[
                                styles.image_container5,
                                "phase4-image-container5",
                            ].join(" ")}
                        >
                            <img
                                className={styles.image}
                                src={items.image1}
                                alt=""
                            />
                        </div>
                        <div
                            className={[
                                styles.image_container6,
                                "phase4-image-container6",
                            ].join(" ")}
                        >
                            <img
                                className={styles.image}
                                src={items.image2}
                                alt=""
                            />
                        </div>
                        <div
                            className={[
                                styles.image_container7,
                                "phase4-image-container7",
                            ].join(" ")}
                        >
                            <img
                                className={styles.image}
                                src={items.image3}
                                alt=""
                            />
                        </div>
                        <div
                            className={[
                                styles.image_container8,
                                "phase4-image-container8",
                            ].join(" ")}
                        >
                            <img
                                className={styles.image}
                                src={items.image4}
                                alt=""
                            />
                        </div>
                        <div
                            className={[
                                styles.image_container9,
                                "phase4-image-container9",
                            ].join(" ")}
                        ></div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Phase4;
