package com.example;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FilterFunction;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.*;

import java.util.Arrays;

public class Q1Solution {
    public void q1(SparkSession spark) {
        System.out.println("Running Q1 Solution ------------------------- ");

//        JavaRDD<String> lines = spark.textFile("src/main/resources/input.txt");
//        JavaRDD<String> words = lines.flatMap(line -> Arrays.asList(line.split("\\s+")).iterator());
//
//        words.mapToPair(word -> new scala.Tuple2<>(word, 1))
//                        .reduceByKey(Integer::sum)
//                                .foreach(t -> System.out.println(t._1 + " : " + t._2));

//        JavaRDD<String> lines = sc.textFile("src/main/resources/input.txt");
//        long totalWords = lines
//                .flatMap(line -> Arrays.asList(line.split("\\s+")).iterator())
//                .count();

//        System.out.println("Total number of words: " + totalWords);

        Dataset<String> lines = spark.read().textFile("src/main/resources/input.txt");

        Dataset<Row> wordCounts = lines
                .flatMap((FlatMapFunction<String, String>) line -> Arrays.asList(line.split("\\s+")).iterator(), Encoders.STRING())
                .filter((FilterFunction<String>) word -> !word.isEmpty())
                .groupBy("value")
                .count()
                .orderBy(functions.desc("count"));

        wordCounts.show(false);
    }
}
