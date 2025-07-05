#Revisit
import csv 

with open(".csv", 'r') as csv_file:

    reader = csv.reader(csv_file)  # reads file row by row
    headers = next(reader)  # stores column names

    totals = [0] * len(headers)
    count = 0

    for row in reader:
        for i in range(len(row)):
            totals[i] += float(row[i])  # adds each number to its column total
        count += 1  # counts rows

    averages = [total / count for total in totals]  # calculates average for each column

    for i in range(len(headers)):
        print(f"{headers[i]}: {averages[i]:.2f}")