package com.example;

import org.apache.spark.sql.*;

import static org.apache.spark.sql.functions.*;

public class Q16Solution {
    public void q16(SparkSession spark) {
        System.out.println("Running Q16 Solution ------------------------- ");

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Sales.csv");

        Dataset<Row> filteredDF = df.filter(
                col("product_id").isNotNull()
                        .and(col("product_name").isNotNull())
                        .and(col("product_name").notEqual("")));

        filteredDF.show();
    }
}
