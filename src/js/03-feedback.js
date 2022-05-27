import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const FORM_LOCAL_STORAGE_KEY = 'feedback-form-state';
const formData = {};

const fillFormRefs = form => {
  const formDataFromLocalStorage = JSON.parse(
    localStorage.getItem(FORM_LOCAL_STORAGE_KEY)
  );
  // const formElements = form.elements;

  for (const key in formDataFromLocalStorage) {
    if (formDataFromLocalStorage.hasOwnProperty(key)) {
      form.elements[key].value = formDataFromLocalStorage[key];
    }
  }
};

fillFormRefs(formRef);

const onFormRefInput = e => {
  // const { target } = e;
  // const formRefValue = target.value;
  // const formRefName = target.name;

  formData[e.target.name] = e.target.value;

  localStorage.setItem(FORM_LOCAL_STORAGE_KEY, JSON.stringify(formData));
};

const onSubmitRef = e => {
  e.preventDefault();

  const formValues = {
    email: formRef.email.value,
    message: formRef.message.value,
  };

  console.log(formValues);

  e.currentTarget.reset();
  localStorage.removeItem(FORM_LOCAL_STORAGE_KEY);
};

formRef.addEventListener('input', throttle(onFormRefInput, 500));
formRef.addEventListener('submit', onSubmitRef);
