"use client";
import styles from "./page.module.css";
import { useState } from "react";

import api from "@/api/api";

const APP_STATUS = {
  IDLE: "IDLE",
  READING_FILE: "READING_FILE",
  FILE_ERROR: "FILE_ERROR",
  FILE_READY: "FILE_READY",
  VALIDATING: "VALIDATING",
  VALIDATION_READY: "VALIDATION_READY",
  UPDATING: "UPDATING",
  DONE: "DONE",
};
export default function Home() {
  const [fileContents, setFileContents] = useState({});
  const [products, setProducts] = useState([]);
  const [allValid, setAllValid] = useState(false);

  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE);

  function handleFileLoading(file) {
    let fileReader = new FileReader();
    fileReader.onloadend = () => handleFileReading(fileReader);
    fileReader.readAsText(file);
  }

  function handleFileReading(reader) {
    let content = reader.result;

    content = content.split("\n");
    content.pop();

    content = content.map((row) => row.split(","));

    setAppStatus(APP_STATUS.READING_FILE);
    processFile(content);
  }

  function processFile(fileContent) {
    const fileObj = {};

    try {
      fileContent.forEach((row, index) => {
        if (index === 0) return;

        if (
          row.length != 2 ||
          !isNumeric(row[0]) ||
          !isNumeric(row[1]) ||
          parseFloat(row[1]) < 0
        ) {
          throw new Error("Invalid file");
        }

        const code = row[0];
        const new_price = row[1];

        fileObj[code] = parseFloat(new_price);
      });

      setFileContents(fileObj);
      setAppStatus(APP_STATUS.FILE_READY);
    } catch (error) {
      setAppStatus(APP_STATUS.FILE_ERROR);
    }
  }

  function handleValidation() {
    setAppStatus(APP_STATUS.VALIDATING);

    api.validate({ new_prices: fileContents }).then(({ products }) => {
      setAppStatus(APP_STATUS.VALIDATION_READY);
      setProducts(products);

      setAllValid(!products.some((product) => !product.valid));
    });
  }

  function handleUpdate() {
    setAppStatus(APP_STATUS.UPDATING);

    const queryBody = {
      new_prices: products.map((product) => {
        return {
          id: product.id,
          new_price: product.new_price,
          new_cost_price: product.new_cost_price,
        };
      }),
    };

    api.update(queryBody).then((result) => {
      setAppStatus(APP_STATUS.DONE);
      window.alert("Os preços foram atualizados.");
      window.location.reload();
    });
  }

  const productCards = products.map((product, key) => {
    const errors = product.validation_errors.map((error, key) => {
      return <div key={`error-${key}`}>{error}</div>;
    });

    return (
      <div key={key}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.current_price}</div>
        <div>{product.new_price}</div>
        <div>{errors}</div>
      </div>
    );
  });

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
      {appStatus === APP_STATUS.VALIDATING && (
        <div>Aguarde enquanto validamos os preços informados.</div>
      )}
      {appStatus === APP_STATUS.VALIDATION_READY && <div>{productCards}</div>}
      <div>
        <button
          disabled={appStatus !== APP_STATUS.FILE_READY}
          onClick={handleValidation}
        >
          Validar
        </button>
        <button disabled={!allValid} onClick={handleUpdate}>
          Atualizar
        </button>
      </div>
    </main>
  );
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
