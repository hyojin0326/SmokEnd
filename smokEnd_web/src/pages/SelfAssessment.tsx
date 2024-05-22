import { Link, Route, Routes } from "react-router-dom";
import styles from "../styles/SelfAssessment.module.css";
import NicotineComponent from "../components/NicotineComponent";
import HabitComponent from "../components/HabitComponent";
import KnowledgeComponent from "../components/KnowledgeComponent";
import ConditionComponent from "../components/ConditionComponent";
import { useState } from "react";
import SelfAssessmentResult from "../components/SelfAssessmentResult";

function SelfAssessment() {
    const [activeTab, setActiveTab] = useState("");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className={styles.content}>
                <p className={styles.pageName}>자가진단</p>
                <p className={styles.p}>금연의 첫 단계</p>

                <div className={styles.menu}>
                    <Link
                        to="nicotine"
                        className={`${styles.box} ${activeTab === "nicotine" ? styles.active : ""}`}
                        onClick={() => handleTabClick("nicotine")}
                    >
                        <p>니코틴 의존도 진단</p>
                    </Link>
                    <Link
                        to="habit"
                        className={`${styles.box} ${activeTab === "habit" ? styles.active : ""}`}
                        onClick={() => handleTabClick("habit")}
                    >
                        <p>흡엽습관 평가</p>
                    </Link>
                    <Link
                        to="knowledge"
                        className={`${styles.box} ${activeTab === "knowledge" ? styles.active : ""}`}
                        onClick={() => handleTabClick("knowledge")}
                    >
                        <p>흡연 상식 점검</p>
                    </Link>
                    <Link
                        to="condition"
                        className={`${styles.box} ${activeTab === "condition" ? styles.active : ""}`}
                        onClick={() => handleTabClick("condition")}
                        style={{ marginRight: 0 }}
                    >
                        <p>신체상태 진단</p>
                    </Link>
                </div>
                <Routes>
                    <Route path="nicotine" element={<><NicotineComponent /></>} />
                    <Route path="habit" element={<HabitComponent />} />
                    <Route path="knowledge" element={<KnowledgeComponent />} />
                    <Route path="condition" element={<ConditionComponent />} />
                    <Route path="result" element={<SelfAssessmentResult />} />
                </Routes>
            </div>
        </>
    );
}

export default SelfAssessment;