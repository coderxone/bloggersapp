public class Solution {
    public int[] TwoSum(int[] nums, int target) {

        List<int> foundNumber = new List<int>();

        int found = 0;
        for(var i = 0;i < nums.Count();i++){
            for(var j = 0;j < nums.Count();j++){
                if(nums[i] + nums[j] == target && i != j){

                    found++;
                    if(found == 1){
                        //Console.Write(nums[i] + "_");
                        //Console.Write(nums[j] + "_");
                        //foundNumber.Add(nums[i]);
                        //foundNumber.Add(nums[j]);
                        foundNumber.Add(i);
                        foundNumber.Add(j);
                    }

                    //continue;
                }
            }
        }

        return foundNumber.ToArray();
    }
}
