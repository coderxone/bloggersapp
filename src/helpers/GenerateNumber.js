const newmodule = {

  generateRandomNumber:(min_value , max_value) => {
      return Math.random() * (max_value-min_value) + min_value;
  }
  
}

export default newmodule;
