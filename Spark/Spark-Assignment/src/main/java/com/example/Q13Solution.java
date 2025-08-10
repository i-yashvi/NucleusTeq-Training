package com.example;

import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.*;

import java.util.*;

import static org.apache.spark.sql.functions.*;

public class Q13Solution {
    public void q13(SparkSession spark) {
        System.out.println("Running Q13 Solution ------------------------- ");

        Dataset<String> lines = spark.read().textFile("src/main/resources/input.txt");

//        Dataset<List<String>> wordsPerLine = lines
//                .flatMap((FlatMapFunction<String, List<String>>) line -> {
//            String cleanedLine = line.toLowerCase().replaceAll("[^a-z\\s]", "");
//            List<String> wordsList = Arrays.asList(cleanedLine.split("\\s+"));
//            return Collections.singletonList(wordsList).iterator();
//        }, Encoders.list(Encoders.STRING()));
//
//        // 3. Generate all unique word pairs from each line
//        Dataset<String> wordPairs = wordsPerLine
//                .flatMap((FlatMapFunction<List<String>, String>) wordsList -> {
//            List<String> pairs = new ArrayList<>();
//            for (int i = 0; i < wordsList.size(); i++) {
//                for (int j = i + 1; j < wordsList.size(); j++) {
//                    String word1 = wordsList.get(i);
//                    String word2 = wordsList.get(j);
//                    // Ensure consistency by sorting the words in the pair
//                    if (word1.compareTo(word2) > 0) {
//                        String temp = word1;
//                        word1 = word2;
//                        word2 = temp;
//                    }
//                    if (!word1.isEmpty() && !word2.isEmpty()) {
//                        pairs.add(word1 + "," + word2);
//                    }
//                }
//            }
//            return pairs.iterator();
//        }, Encoders.STRING());
//
//        // 4. Group by the word pairs and count occurrences
//        Dataset<Row> coOccurrenceCounts = wordPairs.groupBy("value").count();
//
//        // 5. Sort the results in descending order of count
//        Dataset<Row> sortedResults = coOccurrenceCounts.orderBy(desc("count"));
//
//        // 6. Display the top 10 most frequent pairs
//        System.out.println("Top 10 Word Co-occurrence Pairs:");
//        sortedResults.show(10, false);
    }
}
