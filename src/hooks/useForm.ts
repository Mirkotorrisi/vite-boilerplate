import { BaseSyntheticEvent, useReducer } from 'react';

type FormState = Record<string, string | number>;
type Action = { key: string; payload: string | number };

const reducer = (state: FormState, action: Action) => ({
  ...state,
  [action.key]: action.payload,
});

export const useForm = (initialForm: FormState) => {
  const [form, dispatch] = useReducer(reducer, initialForm);

  const handleChange = (e: BaseSyntheticEvent) => {
    dispatch({
      key: e.target.id,
      payload: e.target.value,
    });
  };
  return { form, handleChange };
};
