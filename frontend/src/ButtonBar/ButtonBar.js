import APP_STATUS from "@/app_status";
import Button from "react-bootstrap/Button";
import styles from "./buttonBar.module.css";

export default function ButtonBar({ status, handleValidation, handleUpdate }) {
  return (
    <div className={styles.container}>
      <Button
        disabled={status !== APP_STATUS.FILE_READY}
        onClick={handleValidation}
      >
        Validar
      </Button>
      <Button
        disabled={status !== APP_STATUS.VALIDATION_READY}
        onClick={handleUpdate}
      >
        Atualizar
      </Button>
    </div>
  );
}
