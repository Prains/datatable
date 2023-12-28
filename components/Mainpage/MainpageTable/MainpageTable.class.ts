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

  _stopEditingWithoutSaving = () => {
    const cancelEditingButton = document.querySelector(
      this._cancelEditButtonClass
    ) as HTMLButtonElement;
    cancelEditingButton.click();
  };

  _stopEditingWithSaving = () => {
    const acceptEditButton = document.querySelector(
      this._acceptEditButtonClass
    ) as HTMLButtonElement;
    acceptEditButton.click();
  };

  _stopEditingIfEsc = (e: any) => {
    if (e.key === "Escape") {
      this._stopEditingWithoutSaving();
      this._removeEventListeners();
    }
  };

  _confirmDataIfEnter = (e: any) => {
    if (e.key === "Enter") {
      this._stopEditingWithSaving();
    }
  };

  _removeEventListeners = () => {
    document.removeEventListener("keydown", this._stopEditingIfEsc);
    document.removeEventListener("keydown", this._confirmDataIfEnter);
  };

  _addEventListeners = () => {
    document.addEventListener("keydown", this._stopEditingIfEsc);
    document.addEventListener("keydown", this._confirmDataIfEnter);
  };

  _startEditingRow = (data: any) => {
    this._setEditingRows({ [data.id]: true, ...data });
    this._addEventListeners();
  };

  validation = () => {
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

      const inputField = document.getElementById(fieldId) as HTMLInputElement;

      // если не найден инпут в документе
      if (!inputField) {
        console.error(`Input field with id "${fieldId}" not found.`);
        errorCallback(`Системная ошибка - не найдено поле с id ${fieldId}`);
        continue;
      }

      const value = inputField.value.trim();
      const { regex, errorMessage } = fieldConfig;

      if (!regex.test(value)) {
        // Если значение не соответствует регулярному выражению, устанавливаем ошибку
        inputField.classList.add("error");
        errorCallback(`Ошибка валидации данных: ${errorMessage}`);
        isValid = false;
      } else {
        // Убираем ошибку, если поле валидно
        inputField.classList.remove("error");
      }
    }

    if (isValid) this._removeEventListeners();

    return isValid;
  };

  onRowDoubleCick = (e: any) => {
    const rowData = e.data;

    if (this._editingRows[rowData.id]) {
      this._stopEditingWithoutSaving();
      this._removeEventListeners();
      return;
    }

    this._startEditingRow(rowData);
  };
}

export default MainpageTableClass;
