package com.example;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import static org.apache.spark.sql.functions.col;

public class Q18Solution {
    public void q18(SparkSession spark) {
        System.out.println("Running Q18 Solution ------------------------- ");

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        Dataset<Row> pivotDF = df.filter(
                        col("region").isNotNull())
                .groupBy("category")
                .pivot("region")
                .sum("sales_amount");

        Dataset<Row> east = pivotDF.selectExpr("category", "'East' as region", "East as sales_amount");
        Dataset<Row> west = pivotDF.selectExpr("category", "'West' as region", "West as sales_amount");
        Dataset<Row> north = pivotDF.selectExpr("category", "'North' as region", "North as sales_amount");
        Dataset<Row> south = pivotDF.selectExpr("category", "'South' as region", "South as sales_amount");

        Dataset<Row> unpivotDF = east.union(west).union(north).union(south)
                .filter("sales_amount is not null");

        unpivotDF.show();
    }
}
