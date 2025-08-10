package com.example;

import org.apache.spark.sql.*;

public class Q4Solution {
    public void q4(SparkSession spark) {
        System.out.println("Running Q4 Solution ------------------------- ");

        Dataset<Row> users = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Users.csv");

        Dataset<Row> orders = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Orders.csv");

        users.printSchema();
        orders.printSchema();
    }
}
