package com.example;

import org.apache.spark.sql.*;

public class Q10Solution {
    public void q10(SparkSession spark) {
        System.out.println("Running Q10 Solution ------------------------- ");

        Dataset<Row> sales = spark.read()
                .json("src/main/resources/Sales.json");

        sales.select("product_name", "sales_amount").show(false);
    }
}
