import { ChangeEvent } from 'react';

const handleInputChange = (formData: any, setFormData: any) => (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

export default handleInputChange;
