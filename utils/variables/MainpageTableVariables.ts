import MainpageTableInput from "@/components/Mainpage/MainpageTable/MainpageTableInput/MainpageTableInput";

const validationConfiguration = [
  {
    name: "id",
    regex: /^[0-9]+$/,
    errorMessage: "id может быть только номером",
  },
  {
    name: "postId",
    regex: /^[0-9]+$/,
    errorMessage: "id поста может быть только номером",
  },
  {
    name: "name",
    regex: /^[А-Яа-яA-Za-z\s'-]{1,}$/,
    errorMessage: "Имя может состоять только из букв, минимум одна буква",
  },
  {
    name: "email",
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    errorMessage: "Почта введена некорректно",
  },
  {
    name: "body",
    regex: /^.{1,1000}$/,
    errorMessage: "Тело поста может иметь только от 1 до 1000 символов",
  },
];

const columnConfigurations = [
  {
    rowReorder: true,
  },
  {
    header: "postId",
    field: "postId",
    sortable: true,
    filter: true,
    editor: (options: any) => MainpageTableInput(options, "postId"),
  },
  {
    header: "id",
    field: "id",
    sortable: true,
    filter: true,
    editor: (options: any) => MainpageTableInput(options, "id"),
  },
  {
    header: "name",
    field: "name",
    sortable: true,
    filter: true,
    editor: (options: any) => MainpageTableInput(options, "name"),
  },
  {
    header: "email",
    field: "email",
    sortable: true,
    filter: true,
    editor: (options: any) => MainpageTableInput(options, "email"),
  },
  {
    header: "body",
    field: "body",
    sortable: true,
    filter: true,
    editor: (options: any) => MainpageTableInput(options, "body"),
  },
  {
    rowEditor: true,
  },
];

const inputFieldsIds = ["id", "postId", "email", "body", "name"];

export { columnConfigurations, validationConfiguration, inputFieldsIds };
