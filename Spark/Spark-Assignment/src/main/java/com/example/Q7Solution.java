package com.example;

import org.apache.spark.sql.*;

public class Q7Solution {
    public void q7(SparkSession spark) {
        System.out.println("Running Q7 Solution ------------------------- ");

        Dataset<Row> joinedData = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/JoinedData.csv");

        joinedData.groupBy("location")
                .count().show(false);
    }
}
