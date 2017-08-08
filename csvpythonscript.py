def convert_csv(input, output):
    csvlist = []
    with open(input, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=' ')
        j = 0
        for i in reader:
            if j%3 == 0:
                csvlist.append(i)
        j += 1
    with open(output, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        for i in csvlist:
            writer.writerow(i) 