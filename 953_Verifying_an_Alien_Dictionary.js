/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {

    const compareWords = (a,b) => {

        var maxLength = Math.max(a.length,b.length);

        for(var j = 0;j < maxLength;j++){
            var aPosition = order.indexOf(a[j]);//return true if first position of letter less than 2 position of letter
            var bPosition = order.indexOf(b[j]);

            if(aPosition > bPosition){
                return false;
            }else if(aPosition < bPosition){
                break;
            }
        }

        return true;

    }

    for(var i = 1;i < words.length;i++){
        if(!compareWords(words[i - 1],words[i])){
            return false;
            break;
        }
    }

    return true;

};
