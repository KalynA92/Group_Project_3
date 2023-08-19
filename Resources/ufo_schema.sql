-- Schema creation for the UFO Data--
DROP TABLE UFO_DATA;

-- create new table --
-- Import the data from CSV generated through data clean up - orderedData.csv

CREATE TABLE UFO_DATA(
	ID  				INT				PRIMARY KEY,
	shape		 		VARCHAR(30),
	city	 			VARCHAR(100),
	latitude 			NUMERIC(10, 7),
	longitude 			NUMERIC(10, 7),
	state 				VARCHAR(30),
	country				VARCHAR(30),
	duration_seconds	INT,
	timestamp			TIMESTAMP,
	comments			VARCHAR(2047)
);