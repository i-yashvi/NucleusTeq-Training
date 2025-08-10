package com.example;

import org.apache.spark.sql.*;

import static org.apache.spark.sql.functions.col;

public class Q9Solution {
    public void q9(SparkSession spark) {
        System.out.println("Running Q9 Solution ------------------------- ");

        Dataset<Row> sales = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        Dataset<Row> sorted = sales.orderBy(col("sales_amount").desc());

        sorted.show(false);
    }
}
