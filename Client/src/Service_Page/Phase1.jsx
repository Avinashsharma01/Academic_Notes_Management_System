import styles from "./Phase1.module.css";
import { Phase1Info } from "./Data_Storage_con";
import image2 from "../../src/assets/images/image2.jpg";
function Phase1() {
    return (
        <>
            {Phase1Info.map((items, index) => (
                <div key={index} className={styles.Phase1_main_container}>
                    <img src={image2} alt="" />
                    <h1 className={styles.cheat_sheet1}>{items.heading1}</h1>
                    {/* <p className={styles.cheat_sheet2}>{items.heading2}</p> */}
                </div>
            ))}
        </>
    );
}

export default Phase1;
