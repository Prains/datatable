interface ValidationProps {
  validationConfiguration: {
    name: string;
    regex: RegExp;
    errorMessage: string;
  }[];
  errorCallback: (text: string) => void;
  inputFieldsIds: string[];
}

class MainpageTableClass {
  _setEditingRows: (value: any) => void;
  _editingRows: any;
  _acceptEditButtonClass: string;
  _cancelEditButtonClass: string;
  _validationProps: ValidationProps;

  constructor(
    setEditingRows: (value: any) => void,
    editingRows: any,
    acceptEditButtonClass: string,
    cancelEditButtonClass: string,
    validationProps: ValidationProps
  ) {
    this._setEditingRows = setEditingRows;
    this._editingRows = editingRows;
    this._acceptEditButtonClass = acceptEditButtonClass;
    this._cancelEditButtonClass = cancelEditButtonClass;
    this._validationProps = validationProps;
  }

  //т.к. в библиотеке нет возможности контролировать сохранение и отмену, имитируем клики по соответствующим кнопкам
  _stopEditingWithoutSaving = () => {
    const cancelEditingButton = document.querySelector(
      this._cancelEditButtonClass
    ) as HTMLButtonElement;
    cancelEditingButton.click();
  };

  // то же самое, но для сохранения данных. вызывает валидацию
  _stopEditingWithSaving = () => {
    const acceptEditButton = document.querySelector(
      this._acceptEditButtonClass
    ) as HTMLButtonElement;
    acceptEditButton.click();
  };

  // контролируем слушатель нажатия кнопок на документе
  _controlEventListener = (e: any) => {
    // не удаляем листенер на энтер, т.к. энтер провоцирует валидацию
    if (e.key === "Enter") {
      this._stopEditingWithSaving();
    } else if (e.key === "Escape") {
      this._stopEditingWithoutSaving();
      this._removeEventListener();
    }
  };

  _removeEventListener = () => {
    document.removeEventListener("keydown", this._controlEventListener);
  };

  _addEventListener = () => {
    document.addEventListener("keydown", this._controlEventListener);
  };

  // начинаем редактировать и ставим листенеры
  _startEditingRow = (data: any) => {
    this._setEditingRows({ [data.id]: true, ...data });
    this._addEventListener();
  };

  // валидация полей
  validation = () => {
    // получаем данные валидационного конфига
    const { validationConfiguration, errorCallback, inputFieldsIds } =
      this._validationProps;

    let isValid = true;

    // Проверка каждого поля
    for (const fieldId of inputFieldsIds) {
      const fieldConfig = validationConfiguration.find(
        (config) => config.name === fieldId
      );

      //если нет конфигурации для инпута
      if (!fieldConfig) {
        console.error(
          `Validation configuration for field with id "${fieldId}" not found.`
        );
        errorCallback("Системная ошибка - нет конфигурации валидации");
        continue;
      }

      // т.к. в либе нет возможности получить доступ к инпутам напрямую,
      // взаимодействуем с ними через документ благодаря айдишникам, установленным при рендере ячеек
      const inputField = document.getElementById(fieldId) as HTMLInputElement;

      // если не найден инпут в документе
      if (!inputField) {
        console.error(`Input field with id "${fieldId}" not found.`);
        errorCallback(`Системная ошибка - не найдено поле с id ${fieldId}`);
        continue;
      }

      const value = inputField.value.trim();
      const { regex, errorMessage } = fieldConfig;

      // валидация инпутов значениями регекса из конфига
      if (!regex.test(value)) {
        // Если значение не соответствует регулярному выражению, устанавливаем ошибку
        // напрямую через документ нельзя повесить таилвиндовский класс, т.к. он компилируется только через реактовский класснейм
        // поэтому делаем кастомный класс в globals.css
        inputField.classList.add("error");
        errorCallback(`Ошибка валидации данных: ${errorMessage}`);
        isValid = false;
      } else {
        // Убираем ошибку, если поле валидно
        inputField.classList.remove("error");
      }
    }

    // если все валидно, убираем листенеры
    if (isValid) this._removeEventListener();

    return isValid;
  };

  onRowDoubleCick = (e: any) => {
    const rowData = e.data;

    // если пользователь еще раз нажал двойной клик, а ячейки активны - убираем инпуты. данные не валидируем и не сохраняем, имитируем отказ
    if (this._editingRows[rowData.id]) {
      this._stopEditingWithoutSaving();
      this._removeEventListener();
      return;
    }

    this._startEditingRow(rowData);
  };
}

export default MainpageTableClass;
