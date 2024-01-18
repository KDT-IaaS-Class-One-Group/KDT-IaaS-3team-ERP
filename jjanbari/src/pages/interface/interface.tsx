interface Product {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

interface AnimalCategory {
  animal_id: number;
  animal_name: string;
}

interface AgeCategory {
  age_id: number;
  age_name: string;
}

interface FunctionalCategory {
  functional_id: number;
  functional_name: string;
}

interface LoginFormData {
  user_id: string;
  user_pw: string;
}

interface User {
  user_id: string;
  user_pw: string;
  user_name: string;
}

interface UserProfiles  {
  user_num: number;
  user_id: string;
  user_pw: string;
  user_name: string;
};

export {Product, LoginFormData, User, UserProfiles, AnimalCategory, AgeCategory, FunctionalCategory}