"use client";
import styles from "./page.module.css";
import { useRef, useState } from "react";

const APP_STATUS = {
  IDLE: "IDLE",
  READING_FILE: "READING_FILE",
  FILE_ERROR: "FILE_ERROR",
  FILE_READY: "FILE_READY",
};
export default function Home() {
  const [filecontents, setFileContents] = useState({});

  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE);

  function handleFileLoading(file) {
    let fileReader = new FileReader();
    fileReader.onloadend = () => handleFileReading(fileReader);
    fileReader.readAsText(file);
  }

  function handleFileReading(reader) {
    let content = reader.result;
    content = content.split("\n");
    content = content.map((row) => row.split(","));

    setAppStatus(APP_STATUS.READING_FILE);
    proccessFile(fileContent);
  }

  function proccessFile(fileContent) {
    return;
  }

  return (
    <main className={styles.main}>
      <h1>SHOPPER</h1>
      <input
        type="file"
        accept=".csv"
        onChange={(event) => handleFileLoading(event.target.files[0])}
      />
      {appStatus === APP_STATUS.IDLE && <div>Selecione um arquivo CSV.</div>}
      {appStatus === APP_STATUS.READING_FILE && (
        <div>Aguarde enquanto processamos o arquivo.</div>
      )}
      {appStatus === APP_STATUS.FILE_ERROR && (
        <div>
          Foi encontrado um erro. Certifique-se de que o arquivo adere às regras
          estabelecidas.
        </div>
      )}
      {appStatus === APP_STATUS.FILE_READY && (
        <div>O arquivo está pronto. Clique em validar.</div>
      )}
      <div>
        <button disabled={appStatus !== APP_STATUS.FILE_READY}>Validar</button>
        <button>Atualizar</button>
      </div>
    </main>
  );
}
