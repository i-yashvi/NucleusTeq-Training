package com.example;

import org.apache.spark.sql.*;
import static org.apache.spark.sql.functions.*;

public class Q5Solution {
    public void q5(SparkSession spark) {
        System.out.println("Running Q5 Solution ------------------------- ");

        Dataset<Row> orders = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Orders.csv");

        orders.agg(
                avg("price").alias("Average_Price"),
                max("price").alias("Maximum_Price"),
                min("price").alias("Minimum_Price")
        ).show(false);
    }
}
