package com.example;

import org.apache.spark.sql.*;

public class Q15Solution {
    public void q15 (SparkSession spark){
        System.out.println("Running Q15 Solution ------------------------- ");

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        df.write().parquet("src/main/resources/output_parquet");
    }
}
