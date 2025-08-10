package com.example;

import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.sql.*;

public class Q2Solution{
    public void q2(SparkSession spark) {
        System.out.println("Running Q2 Solution ------------------------- ");
        Dataset<String> lines = spark.read().textFile("src/main/resources/input.txt");

        String keyword = "Spark";
        Dataset<String> filtered = lines
                .filter((FilterFunction<String>) line -> line.contains(keyword));

        filtered.show(false);
    }
}
