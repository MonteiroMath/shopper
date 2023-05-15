"use client";
import styles from "./page.module.css";
import { useState } from "react";

import api from "@/api/api";
import APP_STATUS from "@/app_status";

import FilePicker from "@/FilePicker/FilePicker";
import StatusMsgPanel from "@/StatusMsgPanel/StatusMsgPanel";

export default function Home() {
  const [fileContents, setFileContents] = useState({});
  const [products, setProducts] = useState([]);
  const [allValid, setAllValid] = useState(false);

  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE);

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
      <FilePicker
        updateStatus={(newStatus) => setAppStatus(newStatus)}
        updateFileContents={(fileContents) => setFileContents(fileContents)}
      />
      <StatusMsgPanel status={appStatus} />

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

/*


- Extract CardList and Cards 

- Extract Buttons


*/
