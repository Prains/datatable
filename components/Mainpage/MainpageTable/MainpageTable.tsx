"use client";
import IPost from "@/interfaces/IPost";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

// TODO - эдит таблицы по даблклику

interface IMainpageTable {
  data: IPost[];
}

interface IOption {
  value: any;
  editorCallback: (value: any) => void;
}

// инпут, чтобы редактировать ячейку таблицы. в идеале нужно выносить в отдельный компонент.
//для разных типов инпута нужно создавать конфигурацию для инпута,
//но т.к. в этой таблице меняется только строка, оставляю импут только со строкой

const textEditor = (options: IOption) => {
  return (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
    />
  );
};

const MainpageTable = ({ data }: IMainpageTable) => {
  const [posts, setPosts] = useState(data);

  // обрабатываем ошибки

  if (!posts) return <p>Кажется, посты у нас не прогрузились...</p>;

  // конфигурационный массив таблицы. options типизировал бы как IOption, но тайпскрипт ругается
  const columnConfigurations = [
    {
      rowReorder: true,
    },
    {
      header: "postId",
      field: "postId",
      sortable: true,
      filter: true,
      editor: (options: any) => textEditor(options),
    },
    {
      header: "id",
      field: "id",
      sortable: true,
      filter: true,
      editor: (options: any) => textEditor(options),
    },
    {
      header: "name",
      field: "name",
      sortable: true,
      filter: true,
      editor: (options: any) => textEditor(options),
    },
    {
      header: "email",
      field: "email",
      sortable: true,
      filter: true,
      editor: (options: any) => textEditor(options),
    },
    {
      header: "body",
      field: "body",
      sortable: true,
      filter: true,
      editor: (options: any) => textEditor(options),
    },
    {
      rowEditor: true,
    },
  ];

  // мутируюет посты в соответствии с тем, как изменились посты в таблице
  // изменяет состояние постов
  const onRowEditComplete = (e: any) => {
    let _posts: IPost[] = [...posts];
    let { newData, index } = e;

    _posts[index] = newData;

    setPosts(_posts);
  };

  return (
    <DataTable
      value={posts}
      paginator
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
    >
      {columnConfigurations.map((item, index) => (
        <Column {...item} key={index} />
      ))}
    </DataTable>
  );
};

export default MainpageTable;
