"use client";
import IPost from "@/interfaces/IPost";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// валидационный и конфигурационный файлы таблицы
import {
  validationConfiguration,
  columnConfigurations,
  inputFieldsIds,
} from "@/utils/variables/MainpageTableVariables";
import { useState, useRef } from "react";
// класс с общей функциональностью компонента
import MainpageTableClass from "./MainpageTable.class";
import { Toast } from "primereact/toast";

interface IMainpageTable {
  data: IPost[];
}

const MainpageTable = ({ data }: IMainpageTable) => {
  // данные ряда
  const [posts, setPosts] = useState(data);

  // состояние редактирования ряда
  const [editingRows, setEditingRows] = useState({} as any);

  const toast = useRef<Toast>(null);

  // вызов тоста с текстом ошибки
  const showError = (messageText: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: messageText,
      life: 3000,
    });
  };

  const validationProps = {
    validationConfiguration: validationConfiguration,
    errorCallback: showError,
    inputFieldsIds: inputFieldsIds,
  };

  // класс, содержащий функциональность и логику компонента
  const functions = new MainpageTableClass(
    setEditingRows,
    editingRows,
    ".p-row-editor-save",
    ".p-row-editor-cancel",
    validationProps
  );

  // обрабатываем ошибку, если не пришли данные с сервера
  if (!posts) return <p>Кажется, посты у нас не прогрузились...</p>;

  // мутирует посты в соответствии с тем, как изменились посты в таблице
  // изменяет состояние постов
  const onRowEditComplete = (e: any) => {
    let _posts: IPost[] = [...posts];
    let { newData, index } = e;

    _posts[index] = newData;

    setPosts(_posts);
  };

  return (
    <>
      <DataTable
        value={posts}
        paginator
        dataKey="id"
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sortMode="multiple"
        scrollHeight="800px"
        resizableColumns
        reorderableRows
        reorderableColumns
        onRowReorder={(e) => setPosts(e.value)}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        onRowEditChange={(e) => setEditingRows(e.data)}
        editingRows={editingRows}
        onRowDoubleClick={functions.onRowDoubleCick}
        rowEditValidator={functions.validation}
      >
        {columnConfigurations.map((item, index) => (
          <Column {...item} key={index} />
        ))}
      </DataTable>
      <Toast ref={toast} />
    </>
  );
};

export default MainpageTable;
