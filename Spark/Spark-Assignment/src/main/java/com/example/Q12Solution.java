package com.example;

import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.*;

import java.util.Arrays;

import static org.apache.spark.sql.functions.*;

public class Q12Solution {
    public void q12(SparkSession spark) {
        System.out.println("Running Q12 Solution ------------------------- ");

        Dataset<String> lines = spark.read().textFile("src/main/resources/input.txt");

        Dataset<Row> wordCounts = lines
                .flatMap((FlatMapFunction<String, String>) line -> Arrays.asList(line.split("\\s+")).iterator(), Encoders.STRING())
                .filter((FilterFunction<String>) word -> !word.isEmpty())
                .groupBy("value")
                .count()
                .orderBy(col("count").desc())
                .limit(5);

        wordCounts.show(false);
    }
}
