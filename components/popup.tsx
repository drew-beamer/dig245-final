import styles from "./css/popup.module.css";
import { X } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";

interface PopupProps {
    children: React.ReactNode | React.ReactNode[];
    closeFunction: () => void;
}

export default function Popup({ children, closeFunction }: PopupProps) {


    return <div className={styles.wrapper}>
        <Container fluid className={styles.content}>
            <div className={styles.closeButtonHolder} onClick={closeFunction}>
                <X className={styles.closeButton} />
            </div>
            {children}
        </Container>
    </div>
}