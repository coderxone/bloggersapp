export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SAVE_EMAIL = "SAVE_EMAIL";
export const SAVE_COORD = "SAVE_COORD";
export const SAVE_COUNTRY = "SAVE_COUNTRY";
export const SAVE_CATEGORY = "SAVE_CATEGORY";
export const SAVE_BUSINESS_CATEGORY = "SAVE_BUSINESS_CATEGORY";
export const SAVE_MULTI_DATA = "SAVE_MULTI_DATA";


export function increment() {
  return { type: INCREMENT };
}

export const decrement = () => ({ type: DECREMENT });

export const save_email = (data) => ({type: SAVE_EMAIL,email:data.email,count:data.count,password:data.password })
export const save_coord = (data) => ({type: SAVE_COORD,coord:data })
export const save_country = (data) => ({type: SAVE_COUNTRY,country:data })
export const save_category = (data) => ({type: SAVE_CATEGORY,category:data })
export const save_business_category = (data) => ({type: SAVE_BUSINESS_CATEGORY,category:data })
export const save_multiData = (obj) => ({type: SAVE_MULTI_DATA,_object:obj._object,name:obj.name})
