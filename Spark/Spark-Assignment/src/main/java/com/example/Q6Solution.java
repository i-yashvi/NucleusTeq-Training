package com.example;

import org.apache.spark.sql.*;
import static org.apache.spark.sql.functions.*;

public class Q6Solution {
    public void q6(SparkSession spark) {
        System.out.println("Running Q6 Solution ------------------------- ");

        Dataset<Row> users = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Users.csv");

        Dataset<Row> orders = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("src/main/resources/Orders.csv");

        Dataset<Row> joined = users.join(orders, users.col("user_id").equalTo(orders.col("user_id")))
                .orderBy(asc("user_name"))
                .select(users.col("*"),
                        orders.col("product_id"),
                        orders.col("quantity"),
                        orders.col("price"),
                        orders.col("order_id"),
                        orders.col("order_date"));

        joined.show(false);
    }
}
