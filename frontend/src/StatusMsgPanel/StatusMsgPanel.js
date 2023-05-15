import APP_STATUS from "@/app_status";
import styles from "./StatusMsgPanel.module.css";

export default function StatusMsgPanel({ status }) {
  const MESSAGES = {
    [APP_STATUS.IDLE]: "Selecione um arquivo CSV.",
    [APP_STATUS.READING_FILE]: "Aguarde enquanto processamos o arquivo.",
    [APP_STATUS.FILE_ERROR]:
      "Foi encontrado um erro. Certifique-se de que o arquivo adere às regras estabelecidas.",
    [APP_STATUS.FILE_READY]: "O arquivo está pronto. Clique em validar.",
    [APP_STATUS.FILE_READY]: "O arquivo está pronto. Clique em validar.",
    [APP_STATUS.VALIDATING]: "Aguarde enquanto validamos os preços informados.",
    [APP_STATUS.VALIDATION_ERRORS]:
      "Foram encontrados erros no arquivo de preços.",
    [APP_STATUS.VALIDATION_READY]:
      "Os preços foram validados. Clique em atualizar.",
    [APP_STATUS.UPDATING]: "Aguarde enquanto atualizamos os preços",
  };

  return MESSAGES[status] ? (
    <div className={styles.container}>{MESSAGES[status]}</div>
  ) : null;
}
