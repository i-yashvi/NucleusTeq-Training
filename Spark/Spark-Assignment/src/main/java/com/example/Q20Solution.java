package com.example;

import org.apache.spark.sql.*;
import org.apache.spark.sql.expressions.Window;
import org.apache.spark.sql.expressions.WindowSpec;

import static org.apache.spark.sql.functions.avg;

public class Q20Solution {
    public void q20(SparkSession spark) {
        System.out.println("Running Q20 Solution ------------------------- ");

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        WindowSpec windowSpec = Window.orderBy("sales_date").rowsBetween(-2, 0);

        Dataset<Row> movingAvg = df.withColumn("moving_avg", avg("sales_amount").over(windowSpec));
        movingAvg.select("sales_date", "sales_amount", "moving_avg").show();
    }
}
