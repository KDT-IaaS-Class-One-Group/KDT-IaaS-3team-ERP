import { ChangeEvent } from 'react';

const handleInputChange = (loginFormData: any, setLoginFormData: any) => (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setLoginFormData({
    ...loginFormData,
    [name]: value,
  });
};

export default handleInputChange;
