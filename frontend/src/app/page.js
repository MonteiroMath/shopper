"use client";
import styles from "./page.module.css";
import { useState } from "react";

import api from "@/api/api";
import APP_STATUS from "@/app_status";

import FilePicker from "@/FilePicker/FilePicker";
import StatusMsgPanel from "@/StatusMsgPanel/StatusMsgPanel";
import CardList from "@/CardList/CardList";
import ButtonBar from "@/ButtonBar/ButtonBar";

export default function Home() {
  const [fileContents, setFileContents] = useState({});
  const [products, setProducts] = useState([]);

  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE);

  function handleValidation() {
    setAppStatus(APP_STATUS.VALIDATING);

    api.validate({ new_prices: fileContents }).then(({ products }) => {
      setAppStatus(APP_STATUS.VALIDATION_READY);
      setProducts(products);
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

  return (
    <main className={styles.main}>
      <h1>SHOPPER</h1>
      <FilePicker
        updateStatus={(newStatus) => setAppStatus(newStatus)}
        updateFileContents={(fileContents) => setFileContents(fileContents)}
      />
      <StatusMsgPanel status={appStatus} />

      {appStatus === APP_STATUS.VALIDATION_READY && (
        <CardList products={products} />
      )}
      <ButtonBar
        status={appStatus}
        handleValidation={handleValidation}
        handleUpdate={handleUpdate}
      />
    </main>
  );
}
