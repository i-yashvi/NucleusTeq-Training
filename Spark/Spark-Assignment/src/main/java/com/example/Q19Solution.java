package com.example;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class Q19Solution {
    public void q19(SparkSession spark) {
        System.out.println("Running Q19 Solution ------------------------- ");

        Dataset<Row> df1 = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Users.csv");

        Dataset<Row> df2 = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Orders.csv");

        Dataset<Row> innerJoin = df1.join(df2, "user_id");
        Dataset<Row> leftJoin = df1.join(df2, df1.col("user_id")
                .equalTo(df2.col("user_id")), "left");
        Dataset<Row> rightJoin = df1.join(df2, df1.col("user_id")
                .equalTo(df2.col("user_id")), "right");

        innerJoin.show();
        leftJoin.show();
        rightJoin.show();
    }
}
