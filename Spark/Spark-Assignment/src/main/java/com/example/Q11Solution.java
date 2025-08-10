package com.example;

import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.*;

import java.util.Arrays;

import static org.apache.spark.sql.functions.*;

public class Q11Solution {
    public void q11(SparkSession spark) {
        System.out.println("Running Q11 Solution ------------------------- ");

        Dataset<Row> sales = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        Dataset<Row> totalSalesPerProduct = sales.groupBy("product_name")
                .agg(
                        sum("sales_amount").alias("total_sales_amount"),
                        sum("quantity").alias("total_sales_quantity"))
                .orderBy(functions.desc("total_sales_amount"));

        totalSalesPerProduct.show(false);
    }
}
