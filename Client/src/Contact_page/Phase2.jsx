import styles from "./Phase2.module.css";
import { Phase2Info } from "./Data_Storage_Con";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";
function Phase2() {
    return (
        <>
            {Phase2Info.map((items, index) => (
                <div key={index} className={styles.Phase2_main_container}>
                    <div className={styles.info_container1}>
                        <div className={styles.info_box1}>
                            <h1 className={styles.cheat_sheet1}>
                                {items.heading1}
                            </h1>
                            <p className={styles.cheat_sheet2}>
                                {items.heading2}
                            </p>
                        </div>
                        <div className={styles.info_box2}>
                            <div className={styles.info_part1}>
                                <div className={styles.icon_box}>
                                    <FaPhoneAlt className={styles.icon1} />
                                </div>
                                <div className={styles.icon_box_info}>
                                    <h1 className={styles.cheat_sheet3}>
                                        {items.heading3}
                                    </h1>
                                    <p className={styles.cheat_sheet4}>
                                        {items.heading4}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.info_part1}>
                                <div className={styles.icon_box}>
                                    <MdMarkEmailUnread
                                        className={styles.icon1}
                                    />
                                </div>
                                <div className={styles.icon_box_info}>
                                    <h1 className={styles.cheat_sheet3}>
                                        {items.heading5}
                                    </h1>
                                    <p className={styles.cheat_sheet4}>
                                        {items.heading6}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.info_part1}>
                                <div className={styles.icon_box}>
                                    <FaHome className={styles.icon1} />
                                </div>
                                <div className={styles.icon_box_info}>
                                    <h1 className={styles.cheat_sheet3}>
                                        {items.heading7}
                                    </h1>
                                    <p className={styles.cheat_sheet4}>
                                        {items.heading8}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.info_part1}>
                                <div className={styles.icon_box}>
                                    <FaSquareInstagram
                                        className={styles.icon1}
                                    />
                                </div>
                                <div className={styles.icon_box_info}>
                                    <h1 className={styles.cheat_sheet3}>
                                        {items.heading9}
                                    </h1>
                                    <p className={styles.cheat_sheet4}>
                                        {items.heading10}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.SocilaMediaBox}>
                            <h1 className={styles.cheat_sheet5}>
                                Social Medial
                            </h1>
                            <div className={styles.socialIconBox}>
                                <FaFacebook className={styles.icon2} />
                            </div>
                            <div className={styles.socialIconBox}>
                                <AiFillTwitterCircle className={styles.icon2} />
                            </div>
                            <div className={styles.socialIconBox}>
                                <TbBrandLinkedinFilled
                                    className={styles.icon2}
                                />
                            </div>
                            <div className={styles.socialIconBox}>
                                <FaYoutube className={styles.icon2} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.info_container2}>
                        <input
                            type="text"
                            placeholder="Name"
                            className={styles.inputbox3}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className={styles.inputbox3}
                        />
                        <input
                            type="text"
                            placeholder="Phone no"
                            className={styles.inputbox3}
                        />
                        <textarea
                            type="text"
                            placeholder="Message"
                            className={styles.inputbox4}
                        />
                        <button className={styles.button}>Submit </button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Phase2;
