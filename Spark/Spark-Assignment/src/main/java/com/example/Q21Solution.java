package com.example;

import org.apache.spark.sql.*;

import static org.apache.spark.sql.functions.*;

public class Q21Solution {
    public void q21(SparkSession spark) {
        System.out.println("Running Q21 Solution ------------------------- ");

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Users.csv");

        Dataset<Row> transformed = df.withColumn("name_length", length(col("user_name")));

        transformed.write()
                .mode(SaveMode.Overwrite)
                .parquet("src/main/resources/data_parquet");

    }
}
