export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SAVE_EMAIL = "SAVE_EMAIL";
export const SAVE_COORD = "SAVE_COORD";

export function increment() {
  return { type: INCREMENT };
}

export const decrement = () => ({ type: DECREMENT });

export const save_email = (data) => ({type: SAVE_EMAIL,email:data.email,count:data.count,password:data.password })
export const save_coord = (data) => ({type: SAVE_COORD,coord:data })
