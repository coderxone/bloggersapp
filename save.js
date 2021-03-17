const runSolution = () => {

const getFindCoolNumbers = () => {

      var _sum = 0;
      for (var i = 1; i <= 1000000; i++) {
          var countedSum = 0;
          var currentNumber = i;
          while ((countedSum !== 1) && (countedSum !== 4)) {
              countedSum = 0;
              var convertToString = currentNumber + "";
              var countArray = [];
              countArray = convertToString.split("");

              for (var j = 0; j < countArray.length; j++) {
                  var current = parseInt(countArray[j]);
                  countedSum += Math.pow(current, 2);
              }
              currentNumber = countedSum;
              if (countedSum === 1) {
                  _sum += i;
                  //console.log('cool number: ' + i);
              }
          }
      }
      return _sum;
  }

  const sendRequest = (resultNumber) => {
    $.ajax({
        type: 'POST',
        url: 'http://166.78.22.78/dev/open-sesame.php',
        crossDomain: true,
        data:{ code: resultNumber},
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
            console.log(responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log('POST failed.');
        }
    });
  }

  sendRequest(getFindCoolNumbers());

}

runSolution();
