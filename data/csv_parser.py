import csv
import json

def parse_life_indicators():
	infile = open('../life_expectancy_countries.csv', 'r')
	csv_reader = csv.reader(infile)
	outfile = open('life_expectancy_parsed.csv', 'w')
	csv_writer = csv.writer(outfile)
	json_all = {}
	val_col = 5

	header = ['CountryCode', 'CountryName']

	for x in range(1960, 2014):
		header.append(x)

	print('HEADER: ', header)

	#write header
	csv_writer.writerow(header)
	#skip infile header
	next(csv_reader, None)

	for row in csv_reader:
		if row[1] not in json_all:
			json_all[row[1]] = [row[0], row[val_col]]
			print('added new country!: %s', json_all[row[1]])
		else:
			json_all[row[1]].append(row[val_col])

	infile.close()

	print('the json: ', json_all['ALB'])

	for country in json_all:
		#print('VAL:', country, json_all[country])
		row = [country]
		row.extend(json_all[country])
		csv_writer.writerow(row)




if __name__ == '__main__':
	parse_life_indicators()
