import APP_STATUS from "@/app_status";

export default function ButtonBar({ status, handleValidation, handleUpdate }) {
  return (
    <div>
      <button
        disabled={status !== APP_STATUS.FILE_READY}
        onClick={handleValidation}
      >
        Validar
      </button>
      <button
        disabled={status !== APP_STATUS.VALIDATION_READY}
        onClick={handleUpdate}
      >
        Atualizar
      </button>
    </div>
  );
}
