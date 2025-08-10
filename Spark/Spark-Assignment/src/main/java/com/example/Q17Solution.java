package com.example;

import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.util.Arrays;

import static org.apache.spark.sql.functions.col;

public class Q17Solution {
    public void q17(SparkSession spark) {
        System.out.println("Running Q17 Solution ------------------------- ");

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        Dataset<Row> pivotDF = df.filter(
                col("region").isNotNull())
                .groupBy("category")
                .pivot("region")
                .sum("sales_amount");

        pivotDF.show();
    }
}
