"use client";
import { useState } from "react";
import Loading from "@/app/loading";
import IPost from "@/interfaces/IPost";
import MainpageTable from "./MainpageTable/MainpageTable";

interface IMainPage {
  data: IPost[];
}

const Mainpage = ({ data }: IMainPage) => {
  const [loading, setLoading] = useState(true);

  // из-за использования библиотекой styled-components некст не может предзагрузить стили на сервере.
  // приходится переводить компоненты в клиентские и выдавать искуственный суспенс, чтобы пользователю было комфортно

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="m-10">
          <MainpageTable data={data} />
        </main>
      )}
    </>
  );
};

export default Mainpage;
