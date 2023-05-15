import APP_STATUS from "@/app_status";
import Button from 'react-bootstrap/Button';

export default function ButtonBar({ status, handleValidation, handleUpdate }) {
  return (
    <div>
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
