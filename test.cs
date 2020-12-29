// [11:14] Hanson Qiang
//
// VP
// /       \        \
// GM1 GM2   GM3...
// /   \         \        \
// TM1 TM2, TM3, TM4
//      /\\\
//      IC1 IC2..
// ​[11:18] Hanson Qiang
//
// write a function to find out the lowest common manager between two employees
// ​[11:18] Hanson Qiang
//
// e.g. TM1 is the lowest common manager between IC1 and IC2
// ​[11:18] Hanson Qiang
//
// for TM1 and TM4, the lowest common manager is the VP


//Rextester.Program.Main is the entry point for your code. Don't change it.
//Microsoft (R) Visual C# Compiler version 2.9.0.63208 (958f2354)

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Rextester
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Your code goes here
            List<string> GMList = new List<string>(){"GM1","TM1","GM2","TM2","GM3","TM3","TM4","IC1","IC2"};

            List<string> TM1andTM2 = new List<string>(){};

            for(int i = 0;i < GMList.Count();i++){

                if(GMList[i] == "TM1" || GMList[i] == "TM2"){
                    if(GMList[i].Contains("GM")){
                      TM1andTM2.Add(GMList[i - 1]);
                    }


                }


            }

            for(int d = 0;d < TM1andTM2.Count();d++){
                Console.Write(TM1andTM2[d]);
            }
        }
    }
}
