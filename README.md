# Group_Project_3# Group 3 Project

# Reported UFO Sightings from 1910 to 2014

## Task

For Project 3, you will work with your group to tell a story using data visualizations. Here are the specific requirements:

Your visualization must include a Python Flask-powered API, HTML/CSS, JavaScript, and at least one database (SQL, MongoDB, SQLite, etc.).-

1. A dashboard page with multiple charts that update from the same data

2. Your project should include at least one JS library that we did not cover.

3. Your project must be powered by a dataset with at least 100 records.

4. Your project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).

5. Your final visualization should ideally include at least three views.

## Description

We started by looking for an ideal dataset that each of the group members felt would be light and would enjoy exploring the data. We were looking to do an analysis on reported UFO sightings from 1910 to 2014. The dataset was found on Kaggle. We decided our analysis would be mainly looking at how these reported sightings are related and if these reports support eachother. 

## Mahsa

In my analysis, I considered the key factors that make a UFO sighting more credible based on our database. These factors included multiple sightings in close proximity reported from different countries. I used this criteria to find five specific dates with significant sightings.

I created an easy-to-use interface with a dropdown menu showcasing these five dates. When a date is selected, an interactive map shows the locations of each sighting. Clicking on a marker displays details like date, time, shape, and comments of the sighting.
I categorized the reported shapes into four distinct groups: round, pointy, light, and other. It’s important to note that geometric shapes can appear dissimilar based on varying viewpoints. For instance, a cube can be perceived as any quadrilateral depending on how it’s observed. For the purpose of this analysis, I unified all rounded shapes such as spheres and ovals into a single category, and angular shapes like squares and triangles into another. To illustrate these concepts, I integrated a rotating cube within the dashboard. By manipulating the cube’s orientation, users can observe firsthand how changes in perspective and angle alter the silhouette.
To understand if there’s a connection between time, space, and reported shapes, I visualized a 3D plot. It showed how sightings were spaced out in both time and location. I then trained a model using data from four dates to predict UFO shapes for the fifth date based on time and location. The model performed slightly better than random guessing, but it was also somewhat overfitted. This suggests that a clear pattern between time, space, and reported shape might not exist for these five dates.

## Kalyn

I started my analysis with a blank jupyter notebook. I was particularly interested in how the shapes reported for each sighting related to eachother. I first found the most active date, cities, and shapes. After finding the most active city, I decided to get down to a count of for each of the shapes reported on that date which was July 4, 2010. I created a dataframe and plotted these results in a bar graph for a pleasing visual. I then looked at all of the reported UFO sightings for each year. I got the total counts for each year and plotted the results in a line graph to illustrate the change in the amount of sightings over the entire timeline of the dataset. For my final plotted analysis, I wanted to look at some historical events related to space that may have influenced some of the reported shapes. I looked specifically at data for one year after tv was most common in American homes, one year after apollo 13 landed on the move, one year after the first Star Wars Movie was released and a year after the the first manned private airship was able to leave the Earth's atmosphere. I then plotted these results in a grouped bar graph to show how they compared to eachother and how they all impacted the reported shapes of each of the sightings one year after those specific events happened.

## Sree













## Ana










## References

Reference for main dataset:

https://www.kaggle.com/datasets/NUFORC/ufo-sightings 

Refrence for Plotly visualizations:

https://plotly.com/javascript/
