package com.example;

import org.apache.spark.sql.*;

public class Q8Solution {
    public void q8(SparkSession spark) {
        System.out.println("Running Q8 Solution ------------------------- ");

        Dataset<Row> sales = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        //String[] columns = {"product_id", "product_name", "customer_id"};
        //Dataset<Row> distinct = Sales.dropDuplicates(columns);
        Dataset<Row> distinct = sales.dropDuplicates();

        distinct.show(false);
    }
}
