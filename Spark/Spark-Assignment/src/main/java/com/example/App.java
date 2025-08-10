package com.example;

import org.apache.spark.sql.SparkSession;

public class App {
    public static void main(String[] args) {
        SparkSession spark = SparkSession.builder()
                .appName("Spark Playground")
                .master("local[*]")
                .getOrCreate();
        System.out.println("--------------------------------- Java-Spark Assignment ---------------------------------" );

//        Q1Solution obj1 = new Q1Solution();
//        obj1.q1(spark);
//        Q2Solution obj2 = new Q2Solution();
//        obj2.q2(spark);
//        Q3Solution obj3 = new Q3Solution();
//        obj3.q3(spark);
//        Q4Solution obj4 = new Q4Solution();
//        obj4.q4(spark);
//        Q5Solution obj5 = new Q5Solution();
//        obj5.q5(spark);
//        Q6Solution obj6 = new Q6Solution();
//        obj6.q6(spark);
//        Q7Solution obj7 = new Q7Solution();
//        obj7.q7(spark);
//        Q8Solution obj8 = new Q8Solution();
//        obj8.q8(spark);
//        Q9Solution obj9 = new Q9Solution();
//        obj9.q9(spark);
//        Q10Solution obj10 = new Q10Solution();
//        obj10.q10(spark);
//        Q11Solution obj11 = new Q11Solution();
//        obj11.q11(spark);
//        Q12Solution obj12 = new Q12Solution();
//        obj12.q12(spark);
    /*    Q13Solution obj13 = new Q13Solution();
          obj13.q13(spark);
          Q14Solution obj14 = new Q14Solution();
          obj14.q14(spark);    */
//        Q15Solution obj15 = new Q15Solution();
//        obj15.q15(spark);
//        Q16Solution obj16 = new Q16Solution();
//        obj16.q16(spark);
//        Q17Solution obj17 = new Q17Solution();
//        obj17.q17(spark);
//        Q18Solution obj18 = new Q18Solution();
//        obj18.q18(spark);
//        Q19Solution obj19 = new Q19Solution();
//        obj19.q19(spark);
    /*    Q20Solution obj20 = new Q20Solution();
          obj20.q20(spark);   */
        Q21Solution obj21 = new Q21Solution();
        obj21.q21(spark);

        spark.stop();
    }
}
