/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    var primes = new Array(n).fill(1);

    for(var i = 2;i < primes.length;i++){
        if(primes[i] == 1){
            for(var j = i;j * i < primes.length;j++){
                // deleting not prime numbers
                //if number multiplying without 1 , it's a not prime number
                console.log(i + " * " + j + " = " + i * j)
                primes[i * j] = 0;//4,6,8,9 positions array length 10, deleting prime numbers

            }
        }
    }

    var primesCount = 0;
    for(var i = 2;i < primes.length;i++){
        if(primes[i] == 1){
            primesCount++;
        }
    }
    //console.log(primes);
    return primesCount;
};
