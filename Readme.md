# DW Data: How German companies donate secret money to political parties 

You can read the article [here](http://www.dw.com/en/dw-exclusive-how-german-companies-donate-secret-money-to-political-parties/a-40610200)


## Data sources used:

* Major donations -- [declaration website](https://www.bundestag.de/parlament/praesidium/parteienfinanzierung/fundstellen50000) scraped for each year from 2013 to 2017

* Financial accounts -- [website collecting pdfs](https://www.bundestag.de/parlament/praesidium/parteienfinanzierung/rechenschaftsberichte/) PDFs were downloaded for 2013, 2014 and 2015 for the major parties (CDU, SPD, Greens, CSU, FDP, AFD) pdf data was reconverted with tesseract and cleaned with Regular Expressions and Open Refine 

Please see [this Jupyter Notebook](https://github.com/gcgruen/DW_Data-DonationsToGermanParties/blob/master/Parteispenden.ipynb) for data cleaning and analysis.

This is the [final dataset](https://github.com/gcgruen/DW_Data-DonationsToGermanParties/blob/master/data/ALL-DONATION-DATA-COMPILED.csv) all analysis was built on.

The d3.js code for the interactive visuals can be found [here](https://github.com/gcgruen/DW_Data-DonationsToGermanParties/tree/master/interactive_visuals_EN_Desktop)