import { Dispatch, SetStateAction } from 'react';

/**
 * Handles changing a React Hook StateValue by passing a string to it's setState dispatcher.
 * @param setter React Hooks setState function
 * @param input String value from some input field you want to store in Hook, default {''}
 * @param isEditable Boolean to allow changing the field, default {true}
 * @return void
 */
 export const handleChange = (setter: Dispatch<SetStateAction<any>>, input: string = '', isEditable: boolean = true) => {
  if (isEditable) {
    setter(input);
  }
};
