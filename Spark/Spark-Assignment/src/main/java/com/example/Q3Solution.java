package com.example;

import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.*;

import java.util.Arrays;

public class Q3Solution {
    public void q3(SparkSession spark) {
        System.out.println("Running Q3 Solution ------------------------- ");
        Dataset<String> lines = spark.read().textFile("src/main/resources/input.txt");

        Dataset<Row> charCounts = lines
                .flatMap((FlatMapFunction<String, String>) line -> Arrays.asList(line.split("")).iterator(), Encoders.STRING())
                .filter((FilterFunction<String>) ch -> !ch.isEmpty())
                .groupBy("value")
                .count()
                .orderBy(functions.desc("count"));

        charCounts.show(false);
    }
}
