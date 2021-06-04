//find distance
var DistanceArray = [
  {
    gym:false,
    school:true,
    store:false
  },
  {
    gym:true,
    school:false,
    store:false
  },
  {
    gym:true,
    school:true,
    store:false
  },
  {
    gym:false,
    school:true,//right
    store:false
  },
  {
    gym:false,
    school:true,
    store:true
  },
  {
    gym:false,
    school:true,
    store:true
  },
]

//find distance




var pointsArray = new Array(DistanceArray.length).fill(0);


const calculateMinDistance = (a,b,c,i) => {

      var point = 0;
      var zeroPoint = 0;
      var lastPoint = 0;

      for(const [key,value] of Object.entries(a)){
        if(value === true){
          point += 1;
          zeroPoint += 1;
        }else{
          point -= 1;
          zeroPoint -= 1;
        }
      }

      for(const [key,value] of Object.entries(c)){
        if(value === true){
          point += 1;
          lastPoint += 1;
        }else{
          point -= 1;
          lastPoint -= 1;
        }
      }


  if(i == 1){
    pointsArray[i - 1] = zeroPoint;
  }

  if(i + 1 == pointsArray.length - 1){
    pointsArray[i + 1] = lastPoint;
  }

    pointsArray[i] = point;
}



for(var i = 1;i < DistanceArray.length - 1;i++){
    calculateMinDistance(DistanceArray[i - 1],DistanceArray[i],DistanceArray[i + 1],i);
}


var maxPoint = Math.max(...pointsArray);

var findIndex = pointsArray.indexOf(maxPoint);
console.log(findIndex + " index");
