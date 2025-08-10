package com.example;

import org.apache.spark.sql.*;
import org.apache.spark.sql.functions.*;
import org.apache.spark.sql.expressions.*;

import static org.apache.spark.sql.functions.*;

public class Q14Solution {
    public void q14(SparkSession spark) {
        System.out.println("Running Q20 Solution ------------------------- ");

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        WindowSpec windowSpec = Window.orderBy("sales_date")
                .rowsBetween(Window.unboundedPreceding(), Window.currentRow());

        Dataset<Row> runningTotal = df.withColumn("running_total", sum("sales_amount").over(windowSpec));
        runningTotal.select("sales_date", "sales_amount", "running_total").show();
    }
}