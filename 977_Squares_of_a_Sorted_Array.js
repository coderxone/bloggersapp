var sortedSquares = function(nums) {

    var left = 0;
    var right = nums.length - 1;

    var sortedArray = new Array(nums.length);

    for(var i = nums.length - 1;i >= 0;i--){

        var squared = Math.pow(nums[left], 2);//counting from minuses on left side
        var squaredRight = Math.pow(nums[right], 2);//counting from minuses on left side

        if(squared > squaredRight){
            sortedArray[i] = squared;
             left++;
        }else{
            sortedArray[i] = Math.pow(nums[right], 2);
            right--;
        }

    }

    return sortedArray;

};
