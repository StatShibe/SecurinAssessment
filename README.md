Problem Statement:

1. Consume the CVE information from the CVE API for all the CVE's and store
it in a Database of your choice. - (API BaseURL -
https://services.nvd.nist.gov/rest/json/cves/2.0)

3. Hint for accessing all the CVE's from API - Through a series of smaller
“chunked” responses controlled by an offset startIndex and a page limit
resultsPerPage users may page through all the CVE in the NVD.

5. Apply data cleansing & de-duplication, ensure data quality wherever
applicable

7. CVE details should be synchronized into Database periodically in batch
mode in a specific time period - (This can be full data refresh or incremental
refresh for modified data alone)
8. Develop API’s to read & filter the CVE details by below parameters -
● CVE ID
● CVE ID’s belogs to a specific year
● CVE Score (Field to ref -
metrics.cvssMetricV2.cvssData.baseScore or
metrics.cvssMetricV3.cvssData.baseScore)
● last Modified in N days

9. Read the API and visualise it in UI using HTML, CSS and Javascript
10. Prepare the API documentations for each operations.
11. Write well defined unit test cases for the functionalities.
12. Code should be clear, vulnerable free & well tested and should follow the
best practices and standards.
